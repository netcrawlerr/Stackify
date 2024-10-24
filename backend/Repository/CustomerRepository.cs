using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class CustomerRepository : ICustomer
{
    private readonly ApplicationDBContext _context;

    public CustomerRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Customer> CreateCustomerAsync(Customer customerModel)
    {
        await _context.Customer.AddAsync(customerModel);
        await _context.SaveChangesAsync();
        return customerModel;
    }

    public async Task<List<Customer>> GetAllCustomersAsync()
    {
        return await _context.Customer.ToListAsync();
    }

    public async Task<Customer> GetCustomerByIdAsync(int id)
    {
        return await _context.Customer.FindAsync(id);
    }
}
