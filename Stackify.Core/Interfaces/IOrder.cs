using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IOrder
{
    Task<Order> CreateOrderAsync(Order orderModel);
    Task<Order?> GetOrderByIdAsync(int id);
    Task<List<Order>> GetAllOrdersAsync();
}
