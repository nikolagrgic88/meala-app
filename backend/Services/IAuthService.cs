using MobileApp.Api.DTOs;
using MobileApp.Api.Models;

namespace MobileApp.Api.Services;

public interface IAuthService
{
    Task<AppUser?> RegisterAsync(RegisterDto request);

    Task<AppUser?> LoginAsync(LoginDto request);
  
}