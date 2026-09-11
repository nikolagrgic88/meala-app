using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MobileApp.Api.Models;

public class Meal
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    
    [BsonElement("categoryIds")]
    public List<string> CategoryIds { get; set; } = [];
    
    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;
    
    [BsonElement("affordability")]
    public string Affordability { get; set; } = string.Empty;
    [BsonElement("complexity")]
    public string Complexity { get; set; } = string.Empty;
    [BsonElement("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;
    [BsonElement("duration")]
    public int Duration { get; set; } = 0;
    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;
    [BsonElement("ingredients")]
    public List<string> Ingredients { get; set; } = [];
    [BsonElement("steps")]
    public List<string> Steps { get; set; } = [];
    [BsonElement("isGlutenFree")]
    public bool IsGlutenFree { get; set; } = false;
    [BsonElement("isVegan")]
    public bool IsVegan { get; set; } = false;
    [BsonElement("isVegetarian")]
    public bool IsVegetarian { get; set; } = false;
    [BsonElement("isLactoseFree")]
    public bool IsLactoseFree { get; set; } = false;
}
