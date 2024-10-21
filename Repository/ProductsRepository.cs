using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class ProductsRepository : IProducts
{
    private readonly ApplicationDBContext _context;

    public ProductsRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<Products> CreateProductsAsync(Products products)
    {
        await _context.Products.AddAsync(products);
        await _context.SaveChangesAsync();
        return products;
    }

    public async Task<List<Products>> GetProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }
}
