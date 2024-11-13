using backend.Data;
using backend.DTO;
using backend.DTO.Supplier;
using backend.Interfaces;
using backend.Migrations;
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

    public async Task<Supplier> DeleteSupplierAsync(int id)
    {
        var supplierModel = await _context.Supplier.FirstOrDefaultAsync(x => x.Id == id);

        if (supplierModel == null)
        {
            return null;
        }

        _context.Supplier.Remove(supplierModel);
        await _context.SaveChangesAsync();
        return supplierModel;
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

    public async Task<Supplier> UpdateSupplierAsync(UpdateSupplierRequestDto updateSupplierRequestDto, int id)
    {
        var supplier = await _context.Supplier.FirstOrDefaultAsync(s=>s.Id == id);
        if (supplier == null)
        {
            return null;
        }

        supplier.SupplierName = updateSupplierRequestDto.SupplierName;
        supplier.Category = updateSupplierRequestDto.Category;
        supplier.Email = updateSupplierRequestDto.Email;
        supplier.Phone = updateSupplierRequestDto.Phone;
        supplier.Rating = updateSupplierRequestDto.Rating;
        supplier.Status = updateSupplierRequestDto.Status;
        supplier.DateJoined = updateSupplierRequestDto.DateJoined;
        supplier.MostSoldItem = updateSupplierRequestDto.MostSoldItem;
        
        await _context.SaveChangesAsync();
        return supplier;
    }
}
