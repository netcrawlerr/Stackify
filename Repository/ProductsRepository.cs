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

    public async Task<Products> CreateProductsAsync(Products productsModel)
    {
        await _context.Products.AddAsync(productsModel);
        await _context.SaveChangesAsync();
        return productsModel;
    }

    public async Task<List<Products>> GetProductsAsync()
    {
        return await _context.Products.ToListAsync();
    }
}
