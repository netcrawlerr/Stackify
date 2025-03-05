using Stackify.Application.DTO.Products;
using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IProducts
{
    public Task<List<Products>> GetProductsAsync();
    public Task<Products?> GetSingleProductsAsync(int id);
    public Task<Products?> GetProductByNameAsync(string name);
    public Task<Products> CreateProductsAsync(Products productsModel);
    public Task<Products?> UpdateProductsAsync(
        UpdateProductsRequestDto updateProductsRequestDto,
        int id
    );

    public Task<Products?> DeleteProductsAsync(int id);
}
