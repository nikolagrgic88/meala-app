using System.ComponentModel.DataAnnotations;

namespace MobileApp.Api.DTOs;

public class CreateCategoryDto
{
    [Required]
    [StringLength(50)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [StringLength(3)]
    public string GroupId { get; set; } = string.Empty;
    
    [Required]
    [Url]
    public string ImageUrl { get; set; } = string.Empty;
    
}