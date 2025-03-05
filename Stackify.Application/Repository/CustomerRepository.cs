using Microsoft.EntityFrameworkCore;
using Stackify.Application.Interfaces;
using Stackify.Core.Models;
using Stackify.Infrastructure.Data;

namespace Stackify.Application.Repository;

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

    Task<Customer> ICustomer.CreateCustomerAsync(Customer customerModel)
    {
        throw new NotImplementedException();
    }

    Task<List<Customer>> ICustomer.GetAllCustomersAsync()
    {
        throw new NotImplementedException();
    }

    Task<Customer> ICustomer.GetCustomerByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}
