using Microsoft.Extensions.Options;
using MobileApp.Api.Models;
using MobileApp.Api.Settings;
using MongoDB.Driver;

namespace MobileApp.Api.Services;

public class MealService : IMealService
{
    
    private readonly IMongoCollection<Meal> _meals;

    public MealService(IMongoDatabase database, IOptions<MongoDbSettings> options)
    {
        _meals = database.GetCollection<Meal>(options.Value.MealsCollectionName);
    }
    
    public async Task<List<Meal>> GetAllMealsAsync()
    {
        return await _meals.Find(FilterDefinition<Meal>.Empty).ToListAsync();
    }

    public async Task<Meal?> GetMealByIdAsync(string id)
    {
        return await _meals.Find(m => m.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<Meal>> GetMealsByCategoryIdAsync(string categoryId)
    {
        return await _meals.Find(m=>m.CategoryIds.Contains(categoryId)).ToListAsync();   
    }

    public async Task<Meal> CreateAsync(Meal meal)
    {
        await _meals.InsertOneAsync(meal);
        return meal;
    }

    public async Task<bool> UpdateAsync(Meal meal)
    {
        var result = await _meals.ReplaceOneAsync(m => m.Id == meal.Id, meal);
        return result.MatchedCount == 1;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _meals.DeleteOneAsync(m => m.Id == id);
        return result.DeletedCount == 1;
    }
    
}

