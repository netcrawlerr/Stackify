namespace Stackify.Core.Interfaces;

public interface IStockTransaction
{
    Task<StockTransaction> CreateStockTransactionAsync(StockTransaction stockTransactionModel);
    Task<List<StockTransaction>> GetAllStockTransactionsAsync();
}
