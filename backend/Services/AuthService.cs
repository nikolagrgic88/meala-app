using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MobileApp.Api.DTOs;
using MobileApp.Api.Models;
using MobileApp.Api.Settings;
using MongoDB.Driver;

namespace MobileApp.Api.Services;

public class AuthService : IAuthService
{
    private readonly IMongoCollection<AppUser> _users;
    private readonly IPasswordHasher<AppUser> _passwordHasher;

    public AuthService(IMongoDatabase database, IOptions<MongoDbSettings> options, IPasswordHasher<AppUser> passwordHasher)
    {
        _users = database.GetCollection<AppUser>(options.Value.AuthenticationCollectionName);

        _passwordHasher = passwordHasher;
    }

    public async Task<AppUser?> RegisterAsync(RegisterDto request)
    {
        var normalisedEmail = request.Email.Trim().ToLowerInvariant();

        var emailExists = await _users.Find(u => u.NormalisedEmail == normalisedEmail).AnyAsync();

        if (emailExists)
        {
            return null;
        }

        var user = new AppUser
        {
            Email = request.Email.Trim(),
            NormalisedEmail = normalisedEmail,
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Role = "User"
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _users.InsertOneAsync(user);

        return user;
    }

    public async Task<AppUser?> LoginAsync(LoginDto request)
    {
        var normalisedEmail = request.Email.Trim().ToLowerInvariant();
        var user = await _users.Find(u => u.NormalisedEmail == normalisedEmail).FirstOrDefaultAsync();
        if (user is null)
        {
            return null;
        }
        var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        return passwordResult != PasswordVerificationResult.Failed ? null : user;
       
    }
    
}
