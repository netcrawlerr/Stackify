using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IOrderItem
{
    Task<OrderItem> CreateOrderItemAsync(OrderItem orderItemModel);
    Task<List<OrderItem>> GetAllOrderItemsByOrderIdAsync(int id);
}
