 
using Stackify.Application.Interfaces;
using Stackify.Application.Mappers;
using Microsoft.AspNetCore.Mvc;
using Stackify.Application.DTO.Categories;

namespace Stackify.Api.Controllers;

[Route("/api/category/")]
public class CategoryController : ControllerBase
{
    private readonly ICategory _category;

    public CategoryController(ICategory category)
    {
        _category = category;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(
        [FromBody] CreateCategoryRequestDto createCategoryRequestDto
    )
    {
        var category = await _category.CreateCategoryAsync(
            createCategoryRequestDto.ToCategoryFromCreateDto()
        );
        return Ok(category);
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _category.GetAllCategories();

        if (categories == null)
        {
            return NotFound();
        }
        return Ok(categories);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetCategory([FromRoute] int id)
    {
        var category = await _category.GetCategoryAsync(id);
        if (category == null)
        {
            return NotFound("Category Doesn't exist !");
        }
        return Ok(category);
    }
}
