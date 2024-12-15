using System.ComponentModel.DataAnnotations;

namespace Stackify.Application.DTO.Products;

public class UpdateProductsRequestDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public decimal Price { get; set; }

    [Required]
    public int StockLevel { get; set; }

    [Required]
    public int CategoryId { get; set; }
}
