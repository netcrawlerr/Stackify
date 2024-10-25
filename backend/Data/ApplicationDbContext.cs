using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

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
}
