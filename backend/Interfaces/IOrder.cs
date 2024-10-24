using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IOrder
{
    Task<Order> CreateOrderAsync(OrderDto orderDto);
    Task<Order> GetOrderByIdAsync(int id);
    Task<List<Order>> GetAllOrdersAsync();
}
