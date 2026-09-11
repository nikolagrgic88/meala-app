using System.ComponentModel.DataAnnotations;

namespace MobileApp.Api.DTOs;

public class UpdateMealDto
{
    [Required]
    [MinLength(1)]
    public List<string> CategoryIds { get; set; } = [];

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Affordability { get; set; } = string.Empty;

    [Required]
    public string Complexity { get; set; } = string.Empty;

    [Required]
    [Url]
    public string ImageUrl { get; set; } = string.Empty;

    [Range(1, 1440)]
    public int Duration { get; set; }

    [Required]
    [MinLength(1)]
    public List<string> Ingredients { get; set; } = [];

    [Required]
    [MinLength(1)]
    public List<string> Steps { get; set; } = [];

    [Required]
    public bool IsGlutenFree { get; set; }

    [Required]
    public bool IsVegan { get; set; }

    [Required]
    public bool IsVegetarian { get; set; }

    [Required]
    public bool IsLactoseFree { get; set; }
}