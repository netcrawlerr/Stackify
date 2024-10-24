using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface ICategory
{
    public Task<Categories> CreateCategoryAsync(CategoriesDto categoriesDto);
    public Task<Categories> GetCategoryAsync(int id);
    public Task<Categories> UpadateCatogoryAsync(CategoriesDto categoriesDto, int id);
    public Task<List<Categories>> DeleteCategoryAsync();
}
