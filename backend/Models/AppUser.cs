using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MobileApp.Api.Models;

public class AppUser
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("normalisedEmail")]
    public string NormalisedEmail { get; set; } = string.Empty;

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; } = string.Empty;

    [BsonElement("firstName")]
    public string FirstName { get; set; } = string.Empty;

    [BsonElement("lastName")]
    public string LastName { get; set; } = string.Empty;

    [BsonElement("role")]
    public string Role { get; set; } = "User";
    
    [BsonElement("recipes")]
    public List<string> RecipeIds { get; set; } = [];
    
    [BsonElement("bookmarked")]
    public List<string> BookmarkedMealIds { get; set; } = [];
    
}