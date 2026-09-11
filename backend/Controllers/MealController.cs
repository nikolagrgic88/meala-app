using Microsoft.AspNetCore.Mvc;
using MobileApp.Api.DTOs;
using MobileApp.Api.Models;
using MobileApp.Api.Services;

namespace MobileApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealsController : ControllerBase
{
    private readonly IMealService _mealService;

    public MealsController(IMealService mealService)
    {
        _mealService = mealService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Meal>>> GetAll()
    {
        var meals = await _mealService.GetAllMealsAsync();

        return Ok(meals);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Meal>> GetById(string id)
    {
        var meal = await _mealService.GetMealByIdAsync(id);

        if (meal is null)
        {
            return NotFound();
        }

        return Ok(meal);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<List<Meal>>> GetByCategoryId(string categoryId)
    {
        var meals = await _mealService.GetMealsByCategoryIdAsync(categoryId);

        return Ok(meals);
    }

    [HttpPost]
    public async Task<ActionResult<Meal>> Create(CreateMealDto request)
    {
        var meal = new Meal
        {
            CategoryIds = request.CategoryIds,
            Title = request.Title,
            Affordability = request.Affordability,
            Complexity = request.Complexity,
            ImageUrl = request.ImageUrl,
            Duration = request.Duration,
            Ingredients = request.Ingredients,
            Steps = request.Steps,
            IsGlutenFree = request.IsGlutenFree,
            IsVegan = request.IsVegan,
            IsVegetarian = request.IsVegetarian,
            IsLactoseFree = request.IsLactoseFree
        };

        var createdMeal = await _mealService.CreateAsync(meal);

        return CreatedAtAction(nameof(GetById), new { id = createdMeal.Id }, createdMeal);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateMealDto request)
    {
        var existingMeal = await _mealService.GetMealByIdAsync(id);

        if (existingMeal is null)
        {
            return NotFound();
        }

        var meal = new Meal
        {
            Id = id,
            CategoryIds = request.CategoryIds,
            Title = request.Title,
            Affordability = request.Affordability,
            Complexity = request.Complexity,
            ImageUrl = request.ImageUrl,
            Duration = request.Duration,
            Ingredients = request.Ingredients,
            Steps = request.Steps,
            IsGlutenFree = request.IsGlutenFree,
            IsVegan = request.IsVegan,
            IsVegetarian = request.IsVegetarian,
            IsLactoseFree = request.IsLactoseFree
        };

        var updated = await _mealService.UpdateAsync(meal);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _mealService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}