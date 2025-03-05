using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IStockTransaction
{
    Task<StockTransaction> CreateStockTransactionAsync(StockTransaction stockTransactionModel);
    Task<List<StockTransaction>> GetAllStockTransactionsAsync();
}
