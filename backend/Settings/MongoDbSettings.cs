namespace MobileApp.Api.Settings;

public class MongoDbSettings
{
    public const string SectionName = "MongoDbSettings";

    public string ConnectionString { get; set; } = string.Empty;

    public string DatabaseName { get; set; } = string.Empty;

    public string MealsCollectionName { get; set; } = string.Empty;

    public string CategoriesCollectionName { get; set; } = string.Empty;
    
    public string AuthenticationCollectionName { get; set; } = string.Empty;
}