namespace Stackify.Application.Repository;

public class StockTransactionRepository : IStockTransaction
{
    private readonly ApplicationDBContext _context;

    public StockTransactionRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<StockTransaction> CreateStockTransactionAsync(
        StockTransaction stockTransactionModel
    )
    {
        _context.StockTransaction.Add(stockTransactionModel);
        await _context.SaveChangesAsync();
        return stockTransactionModel;
    }

    public async Task<List<StockTransaction>> GetAllStockTransactionsAsync()
    {
        return await _context.StockTransaction.ToListAsync();
    }
}
