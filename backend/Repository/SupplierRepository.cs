using backend.Data;
using backend.DTO;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class SupplierRepository : ISupplier
{
    private readonly ApplicationDBContext _context;

    public SupplierRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Supplier> CreateSupplierAsync(Supplier supplierModel)
    {
        await _context.Supplier.AddAsync(supplierModel);
        await _context.SaveChangesAsync();
        return supplierModel;
    }

    public Task<Supplier> DeleteSupplierAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Supplier>?> GetAllSupliersAsync()
    {
        var suppliers = await _context.Supplier.ToListAsync();

        if (suppliers == null)
        {
            return null;
        }
        return suppliers;
    }

    public Task<Supplier> GetSupplierAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Supplier> UpdateSupplierAsync(SupplierDto supplierDto)
    {
        throw new NotImplementedException();
    }
}
