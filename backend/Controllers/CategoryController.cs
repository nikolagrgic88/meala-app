using Microsoft.AspNetCore.Mvc;
using MobileApp.Api.DTOs;
using MobileApp.Api.Models;
using MobileApp.Api.Services;

namespace MobileApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Category>>> GetAll()
    {
        var categories =
            await _categoryService.GetAllCategoriesAsync();

        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetById(string id)
    {
        var category =
            await _categoryService.GetByIdAsync(id);

        if (category is null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    public async Task<ActionResult<Category>> Create(CreateCategoryDto request)
    {
        var category = new Category
        {
            Title = request.Title,
            GroupId = request.GroupId,
            ImageUrl = request.ImageUrl
        };

        var createdCategory = await _categoryService.CreateAsync(category);

        return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, createdCategory);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, UpdateCategoryDto request)
    {
        var category = new Category
        {
            Id = id,
            Title = request.Title,
            GroupId = request.GroupId,
            ImageUrl = request.ImageUrl
        };

        var updated =
            await _categoryService.UpdateAsync(category);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _categoryService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}