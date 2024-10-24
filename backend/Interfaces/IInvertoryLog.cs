using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IInvertoryLog
{
    public Task<InventoryLog> CreateInventoryLogAsync(InventoryLog inventoryLogModel);
    public Task<List<InventoryLog>> GetAllInventoryLogAsync();
}
