using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IStockTransaction
{
    Task<StockTransaction> CreateStockTransactionAsync(StockTransaction stockTransactionModel);
    Task<List<StockTransaction>> GetAllStockTransactionsAsync();
}
