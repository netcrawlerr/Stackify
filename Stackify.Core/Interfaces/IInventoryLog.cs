using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IInventoryLog
{
    public Task<InventoryLog> CreateInventoryLogAsync(InventoryLog inventoryLogModel);
    public Task<List<InventoryLog>> GetAllInventoryLogAsync();
}
