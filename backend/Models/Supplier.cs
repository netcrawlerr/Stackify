namespace backend.Models;

public class Supplier
{
    public int Id { get; set; }
    public string SupplierName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Rating { get; set; } = 0;
    public string Email { get; set; } = string.Empty;
    public string DateJoined { get; set; } = string.Empty;
    public string MostSoldItem { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
}
