using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IOrderItem
{
    Task<OrderItem> CreateOrderItemAsync(OrderDto orderDto);
    Task<List<OrderItem>> GetAllOrderItemsByOrderIdAsync(int id);
}
