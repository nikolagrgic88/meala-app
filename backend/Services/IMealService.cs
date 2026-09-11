using MobileApp.Api.Models;

namespace MobileApp.Api.Services;

public interface IMealService
{
    Task<List<Meal>> GetAllMealsAsync();
    Task<Meal?> GetMealByIdAsync(string id);
    Task<List<Meal>> GetMealsByCategoryIdAsync(string categoryId);
    Task<Meal> CreateAsync(Meal meal);
    Task<bool> UpdateAsync(Meal meal);
    Task<bool> DeleteAsync(string id);
    
}