namespace backend.Models;

public class Products
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockLevel { get; set; }
    public int CategoryId { get; set; } // my foeign key
    public string Status { get; set; } = "Available";
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public virtual Categories Category { get; set; } // Navigation property

}
