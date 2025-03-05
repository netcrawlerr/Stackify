using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IOrderItem
{
    Task<OrderItem> CreateOrderItemAsync(OrderItem orderItemModel);
    Task<List<OrderItem>> GetAllOrderItemsByOrderIdAsync(int id);
}
