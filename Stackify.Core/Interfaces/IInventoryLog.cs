namespace Stackify.Core.Interfaces;

public interface IInventoryLog
{
    public Task<InventoryLog> CreateInventoryLogAsync(InventoryLog inventoryLogModel);
    public Task<List<InventoryLog>> GetAllInventoryLogAsync();
}
