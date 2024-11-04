namespace backend.DTO.Supplier;

public class CreateSupplierRequestDto
{
    public string SupplierName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DateJoined { get; set; } = string.Empty;
}
