using System.ComponentModel.DataAnnotations;

namespace backend.DTO;

public class UpdateProductsRequestDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
}
