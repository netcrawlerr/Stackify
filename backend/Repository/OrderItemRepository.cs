using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class OrderItemRepository : IOrderItem
{
    private readonly ApplicationDBContext _context;

    public OrderItemRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<OrderItem> CreateOrderItemAsync(OrderItem orderItemModel)
    {
        _context.OrderItem.Add(orderItemModel);
        await _context.SaveChangesAsync();
        return orderItemModel;
    }

    public async Task<List<OrderItem>> GetAllOrderItemsByOrderIdAsync(int id)
    {
        return await _context.OrderItem.ToListAsync();
    }
}
