using Stackify.Core.Interfaces;
using Stackify.Core.Models;

namespace Stackify.Application.Repository
{
    public class CategoryRepository : ICategory
    {
        private readonly ApplicationDBContext _context;

        public CategoryRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Categories> CreateCategoryAsync(Categories categoriesModel)
        {
            await _context.Categories.AddAsync(categoriesModel);
            await _context.SaveChangesAsync();
            return categoriesModel;
        }

        public async Task<Categories?> DeleteCategoryAsync(int id)
        {
            var categoryModel = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if (categoryModel == null)
            {
                return null;
            }
            _context.Categories.Remove(categoryModel);
            await _context.SaveChangesAsync();
            return categoryModel;
        }

        public async Task<List<Categories>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }

        public async Task<Categories?> GetCategoryAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Categories> UpdateCategoryAsync(CategoriesDto categoriesDto, int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                throw new KeyNotFoundException("Category not found.");
            }

            category.CategoryName = categoriesDto.CategoryName;
            category.Description = categoriesDto.Description;
            await _context.SaveChangesAsync();

            return category;
        }
    }
}
