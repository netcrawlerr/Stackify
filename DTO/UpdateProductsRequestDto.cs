using System.ComponentModel.DataAnnotations;

namespace Stackify.DTO;

public class UpdateProductsRequestDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
}
