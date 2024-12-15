using Stackify.Core.Models;

namespace Stackify.Infrastructure.Data;

public class ApplicationDBContext : IdentityDbContext<Users>
{
    public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) { }

    // this are the tables
    public DbSet<Products> Products { get; set; }
    public DbSet<Categories> Categories { get; set; }
    public DbSet<Customer> Customer { get; set; }
    public DbSet<InventoryLog> InventoryLog { get; set; }
    public DbSet<Order> Order { get; set; }
    public DbSet<OrderItem> OrderItem { get; set; }
    public DbSet<ProductsImage> ProductsImage { get; set; }
    public DbSet<StockTransaction> StockTransaction { get; set; }
    public DbSet<Supplier> Supplier { get; set; }
    public DbSet<SupplierProduct> SupplierProduct { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Configure relationships
        builder
            .Entity<Products>()
            .HasOne(p => p.Category)
            .WithMany() // Assuming Category does not have a navigation property back to Products
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict); // Or another behavior depending on your requirements

        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Name = "User", NormalizedName = "USER" },
        };

        builder.Entity<IdentityRole>().HasData(roles);
    }
}
