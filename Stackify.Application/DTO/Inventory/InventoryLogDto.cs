namespace Stackify.Application.DTO.Inventory
{
    public class InventoryLogDto
    {
        public int Id { get; set; }
        public string Action { get; set; } = string.Empty;
        public int ProductId { get; set; }
        public int OldStock { get; set; }
        public int NewStock { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }  
    }
}
