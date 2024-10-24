using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IStockTransaction
{
    Task<StockTransaction> CreateStockTransactionAsync(StockTransactionDto stockTransactionDto);
    Task<List<StockTransaction>> GetAllStockTransactionsAsync();
}
