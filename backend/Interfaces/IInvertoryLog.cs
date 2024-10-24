using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface IInvertoryLog
{
    public Task<InventoryLog> CreateInventoryLogAsync(InventoryLogDto inventoryLogDto);
    public Task<List<InventoryLog>> GetAllInventoryLogAsync();
}
