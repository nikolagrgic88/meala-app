namespace MobileApp.Api.DTOs;

public class LoginResponseDto
{
    public string AccessToken { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }

    public UserResponseDto User { get; set; } = new();
}