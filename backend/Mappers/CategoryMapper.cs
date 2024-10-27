using backend.DTO.Catergories;
using backend.Models;

namespace backend.Mappers;

public static class CategoryMapper
{
    public static Categories ToCategoryFromCreateDto(
        this CreateCategoryRequestDto createCategoryRequestDto
    )
    {
        return new Categories
        {
            CategoryName = createCategoryRequestDto.CategoryName,
            Description = createCategoryRequestDto.Description,
        };
    }
}
