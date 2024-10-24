namespace backend.Models;

public class Supplier
{
    public int Id { get; set; }
    public string SupplierName { get; set; } = string.Empty;
    public string ContactInfo { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
