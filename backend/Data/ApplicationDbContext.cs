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
}
