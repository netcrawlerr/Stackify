namespace backend.Models;

public class InventoryLog
{
    public int Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public int OldStock { get; set; }
    public int NewStock { get; set; }
    public DateTime Date { get; set; }
    public string? UserId { get; set; } // Change to string to match IdentityUser

    public virtual Products Product { get; set; } // Navigation property
    public virtual Users User { get; set; } // Navigation property
}
