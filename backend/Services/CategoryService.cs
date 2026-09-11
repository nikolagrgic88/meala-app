using Microsoft.Extensions.Options;
using MobileApp.Api.Models;
using MobileApp.Api.Settings;
using MongoDB.Bson;
using MongoDB.Driver;

namespace MobileApp.Api.Services;

public class CategoryService : ICategoryService
{
    private readonly IMongoCollection<Category> _categories;

    public CategoryService(IMongoDatabase database, IOptions<MongoDbSettings> options)
    {
        _categories = database.GetCollection<Category>(options.Value.CategoriesCollectionName);
    }

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
     
        var count = await _categories.CountDocumentsAsync(
     
        FilterDefinition<Category>.Empty);
      
        Console.WriteLine($"Categories found by API: {count}");
        return await _categories
            .Find(FilterDefinition<Category>.Empty)
            .ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(string id)
    {
        if(!ObjectId.TryParse(id, out _)) return null;
        
        return await _categories.Find(c=>c.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Category> CreateAsync(Category category)
    {
        await _categories.InsertOneAsync(category);
       
        return category;
    }

    public async Task<bool> UpdateAsync(Category category)
    {
      var results =  await _categories.ReplaceOneAsync(c => c.Id == category.Id, category);
      return results.MatchedCount == 1;
    }

    public async Task<bool> DeleteAsync(string id)
    {
       var result = await _categories.DeleteOneAsync(c => c.Id == id);
       return result.DeletedCount == 1;
    }
}


