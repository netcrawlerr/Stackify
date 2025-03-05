using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface ICustomer
{
    Task<Customer> CreateCustomerAsync(Customer customerModel);
    Task<Customer> GetCustomerByIdAsync(int id);
    Task<List<Customer>> GetAllCustomersAsync();
}
