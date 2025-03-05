using Microsoft.EntityFrameworkCore;
using Stackify.Application.Interfaces;
using Stackify.Core.Models;
using Stackify.Infrastructure.Data;

namespace Stackify.Application.Repository;

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

    Task<OrderItem> IOrderItem.CreateOrderItemAsync(OrderItem orderItemModel)
    {
        throw new NotImplementedException();
    }

    Task<List<OrderItem>> IOrderItem.GetAllOrderItemsByOrderIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}
