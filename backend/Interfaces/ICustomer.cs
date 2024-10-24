using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface ICustomerService
{
    Task<Customer> CreateCustomerAsync(CustomerDto customerDto);
    Task<Customer> GetCustomerByIdAsync(int id);
    Task<List<Customer>> GetAllCustomersAsync();
}
