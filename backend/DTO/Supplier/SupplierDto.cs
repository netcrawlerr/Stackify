namespace backend.DTO
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Rating { get; set; } = 0;
        public string Email { get; set; } = string.Empty;
        public DateOnly Phone { get; set; }
        public string MostSoldItem { get; set; } = string.Empty;
    }
}
