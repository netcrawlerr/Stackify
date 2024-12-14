namespace Stackify.Application.DTO.Supplier;

public class CreateSupplierRequestDto
{
    public string SupplierName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Rating { get; set; } = 0;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string DateJoined { get; set; } = string.Empty;
    public string MostSoldItem { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
