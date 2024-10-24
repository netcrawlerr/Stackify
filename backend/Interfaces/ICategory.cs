using backend.DTO;
using backend.Models;

namespace backend.Interfaces;

public interface ICategory
{
    public Task<Categories> CreateCategoryAsync(Categories categoriesModel);
    public Task<Categories?> GetCategoryAsync(int id);
    public Task<Categories> UpdateCategoryAsync(CategoriesDto categoriesDto, int id);
    public Task<Categories?> DeleteCategoryAsync(int id);
}
