using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IOrder
{
    Task<Order> CreateOrderAsync(Order orderModel);
    Task<Order?> GetOrderByIdAsync(int id);
    Task<List<Order>> GetAllOrdersAsync();
}
