using backend.Models;

namespace backend.Interfaces;

public interface IProducts
{
    public Task<List<Products>> GetProductsAsync();
    public Task<Products> CreateProductsAsync(Products productsModel);
}
