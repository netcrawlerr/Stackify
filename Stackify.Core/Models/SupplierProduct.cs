namespace backend.Models;

public class SupplierProduct
{
    public int Id { get; set; }
    public int SupplierId { get; set; }
    public int ProductId { get; set; }
    public decimal Price { get; set; }
    public int SupplyLeadTime { get; set; }
}
