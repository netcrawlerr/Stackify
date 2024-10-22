using backend.Models;
using backend.DTO;

namespace backend.Interfaces;

public interface IProducts
{
    public Task<List<Products>> GetProductsAsync();
    public Task<Products?> GetSingleProductsAsync(int id);
    public Task<Products> CreateProductsAsync(Products productsModel);
    public Task<Products?> UpdateProductsAsync(
        UpdateProductsRequestDto updateProductsRequestDto,
        int id
    );

    public Task<Products?> DeleteProductsAsync(int id);
}
