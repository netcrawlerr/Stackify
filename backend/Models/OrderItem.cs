namespace backend.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Total { get; set; }

    public virtual Order Order { get; set; } // Navigation property
    public virtual Products Product { get; set; } // Navigation property
}
