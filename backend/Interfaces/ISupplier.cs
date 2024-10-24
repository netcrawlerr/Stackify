using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface ISupplier
{
    public Task<Supplier> CreateSupplierAsync(Supplier supplierModel);
    public Task<Supplier> GetSupplierAsync(int id);
    public Task<List<Supplier>> GetAllSupliersAsync();
    public Task<Supplier> UpdateSupplierAsync(SupplierDto supplierDto);
    public Task<Supplier> DeleteSupplierAsync(int id);
}
