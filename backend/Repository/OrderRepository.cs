using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class OrderRepository : IOrder
{
    private readonly ApplicationDBContext _context;

    public OrderRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Order> CreateOrderAsync(Order orderModel)
    {
        await _context.Order.AddAsync(orderModel);
        await _context.SaveChangesAsync();
        return orderModel;
    }

    public async Task<List<Order>> GetAllOrdersAsync()
    {
        return await _context.Order.ToListAsync();
    }

    public async Task<Order> GetOrderByIdAsync(int id)
    {
        return await _context.Order.FindAsync(id);
    }
}
