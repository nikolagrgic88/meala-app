using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MobileApp.Api.DTOs;
using MobileApp.Api.Services;
using MobileApp.Api.Settings;

namespace MobileApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
   
    private readonly IAuthService _authService;
    private readonly ITokenService _tokenService;
    private readonly JwtSettings _jwtSettings;

    public AuthController(IAuthService authService, ITokenService tokenService, IOptions<JwtSettings> jwtOptions)
    {
        _authService = authService;
        _tokenService = tokenService;
        _jwtSettings = jwtOptions.Value;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto request)
    {
        var user = await _authService.RegisterAsync(request);

        if (user is null)
        {
            return Conflict(new
            {
                message = "An account with this email already exists."
            });
        }

        return Created("", new
        {
            id = user.Id,
            email = user.Email,
            firstName = user.FirstName,
            lastName = user.LastName,
            role = user.Role
        });
    }

    [HttpPost("authenticate")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginDto request)
    {
        var user = await _authService.LoginAsync(request);

        if (user is null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var accessToken = _tokenService.CreateAccessToken(user);

        var response = new LoginResponseDto
        {
            AccessToken = accessToken,

            ExpiresAt = DateTime.UtcNow.AddMinutes(
                _jwtSettings.ExpiryMinutes
            ),

            User = new UserResponseDto
            {
                Id = user.Id ?? string.Empty,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                RecipeIds = user.RecipeIds,
                BookmarkedMealIds = user.BookmarkedMealIds
            }
        };

        return Ok(response);
    }

}