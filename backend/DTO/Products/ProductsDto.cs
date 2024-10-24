namespace backend.DTO
{
    public class ProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
        public int CategoryId { get; set; }
        public int SupplierId { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
