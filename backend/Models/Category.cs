using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace MobileApp.Api.Models;

public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("groupId")]
    public string GroupId { get; set; } = string.Empty;
    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;
    [BsonElement("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;
    
}