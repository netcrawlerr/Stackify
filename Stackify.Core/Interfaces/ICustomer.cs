namespace Stackify.Core.Interfaces;

public interface ICustomer
{
    Task<Customer> CreateCustomerAsync(Customer customerModel);
    Task<Customer> GetCustomerByIdAsync(int id);
    Task<List<Customer>> GetAllCustomersAsync();
}
