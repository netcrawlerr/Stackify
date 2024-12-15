namespace Stackify.Core.Interfaces;

public interface ISupplier
{
    public Task<Supplier> CreateSupplierAsync(Supplier supplierModel);
    public Task<Supplier> GetSupplierAsync(int id);
    public Task<List<Supplier>?> GetAllSupliersAsync();
    public Task<Supplier> UpdateSupplierAsync(UpdateSupplierRequestDto updateSupplierRequestDto, int id);
    public Task<Supplier> DeleteSupplierAsync(int id);
}
