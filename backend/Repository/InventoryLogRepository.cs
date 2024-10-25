using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class InventoryLogRepository : IInventoryLog
{
    private readonly ApplicationDBContext _context;

    public InventoryLogRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<InventoryLog> CreateInventoryLogAsync(InventoryLog inventoryLogModel)
    {
        await _context.InventoryLog.AddAsync(inventoryLogModel);
        await _context.SaveChangesAsync();
        return inventoryLogModel;
    }

    public async Task<List<InventoryLog>> GetAllInventoryLogAsync()
    {
        return await _context.InventoryLog.ToListAsync();
    }
}
