namespace backend.Models;

public class StockTransaction
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string TransactionType { get; set; } = string.Empty; //
    public int Quantity { get; set; }
    public DateTime Date { get; set; }
    public string Reason { get; set; } = string.Empty;
}
