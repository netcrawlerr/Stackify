namespace Stackify.Core.Interfaces;

public interface IOrderItem
{
    Task<OrderItem> CreateOrderItemAsync(OrderItem orderItemModel);
    Task<List<OrderItem>> GetAllOrderItemsByOrderIdAsync(int id);
}
