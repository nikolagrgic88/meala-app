using MobileApp.Api.Models;

namespace MobileApp.Api.Services;

public interface ICategoryService
{
    Task<List<Category>> GetAllCategoriesAsync();

    Task<Category?> GetByIdAsync(string id);

    Task<Category> CreateAsync(Category category);

    Task<bool> UpdateAsync(Category category);

    Task<bool> DeleteAsync(string id);
}