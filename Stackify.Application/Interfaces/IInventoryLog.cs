using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IInventoryLog
{
    public Task<InventoryLog> CreateInventoryLogAsync(InventoryLog inventoryLogModel);
    public Task<List<InventoryLog>> GetAllInventoryLogAsync();
}
