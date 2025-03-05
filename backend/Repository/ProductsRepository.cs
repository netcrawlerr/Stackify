using backend.Data;
using backend.DTO.Products;
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

    public async Task<Products?> GetProductByNameAsync(string name)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Name == name);
        if (product == null)
        {
            return null;
        }
        return product;
    }

    public async Task<Products> CreateProductsAsync(Products productsModel)
    {
        await _context.Products.AddAsync(productsModel);
        await _context.SaveChangesAsync();
        return productsModel;
    }

    public async Task<Products?> DeleteProductsAsync(int id)
    {
        var productModel = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (productModel == null)
        {
            return null;
        }

        _context.Products.Remove(productModel);
        await _context.SaveChangesAsync();
        return productModel;
    }

    public async Task<List<Products>> GetProductsAsync()
    {
        return await _context.Products.Include(p => p.Category).ToListAsync();
    }

    public async Task<Products?> GetSingleProductsAsync(int id)
    {
        var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (existingProduct == null)
        {
            return null;
        }
        return existingProduct;
    }

    public async Task<Products?> UpdateProductsAsync(
        UpdateProductsRequestDto updateProductsRequestDto,
        int id
    )
    {
        var existingProduct = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (existingProduct == null)
        {
            return null;
        }

        existingProduct.Name = updateProductsRequestDto.Name;
        existingProduct.Description = updateProductsRequestDto.Description;
        existingProduct.Price = updateProductsRequestDto.Price;
        existingProduct.StockLevel = updateProductsRequestDto.StockLevel;
        existingProduct.CategoryId = updateProductsRequestDto.CategoryId;

        await _context.SaveChangesAsync();

        return existingProduct;
    }
}
