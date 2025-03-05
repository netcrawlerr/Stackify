using System.ComponentModel.DataAnnotations;

namespace backend.DTO.Products;

public class CreateProductsRequestDto
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


    public string Status { get; set; } = string.Empty;

}
