using Stackify.Application.DTO.Products;
using Stackify.Core.Models;

namespace Stackify.Application.Mappers;

public static class ProductsMappers
{
    public static ProductsDto ToProductsDto(this Products productsModel)
    {
        return new ProductsDto
        {
            Id = productsModel.Id,
            Name = productsModel.Name,

        };
    }

    public static Products ToProductsFromCreateDto(
        this CreateProductsRequestDto createProductsRequestDto
    )
    {
        return new Products
        {
            Name = createProductsRequestDto.Name,
            Description = createProductsRequestDto.Description,
            Price = createProductsRequestDto.Price,
            StockLevel = createProductsRequestDto.StockLevel,
            CategoryId = createProductsRequestDto.CategoryId,
        };
    }
}
