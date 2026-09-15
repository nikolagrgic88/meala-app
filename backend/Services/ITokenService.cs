using MobileApp.Api.Models;

namespace MobileApp.Api.Services;

public interface ITokenService
{
    string CreateAccessToken(AppUser user);
}