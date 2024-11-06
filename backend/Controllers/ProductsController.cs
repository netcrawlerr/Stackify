using backend.DTO;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProducts _products;

        public ProductsController(IProducts products)
        {
            _products = products;
        }

        [HttpGet]
        public async Task<IActionResult?> GetProducts()
        {
            var products = await _products.GetProductsAsync();

            var productWithCategory = products.Select(p=> new ProductsDto {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                TotalValue = p.Price * p.StockLevel,
                StockLevel = p.StockLevel,
                CategoryName = p.Category.CategoryName
            }).ToList();

            return Ok(productWithCategory);
        }

        [HttpGet("available")]
        public async Task<IActionResult?> GetAvailableProducts()
        {
             var products = await _products.GetProductsAsync();

            var availableProducts = products
                .Where(p=>p.Status == "Available")
                .Select(p=> new ProductsDto {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    StockLevel = p.StockLevel,
                    CategoryName = p.Category.CategoryName,
                    Status = p.Status
                }).ToList();

                return Ok(availableProducts);
        } 
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetSingleProduct([FromRoute] int id)
        {
            var products = await _products.GetSingleProductsAsync(id);
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products.ToProductsDto());
        }

        [HttpGet]
        [Route("name")]
        public async Task<IActionResult> GetProductByName([FromRoute] string name)
        {
            var product = await _products.GetProductByNameAsync(name);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult?> CreateProducts(
            [FromBody] CreateProductsRequestDto createProductsRequestDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productModel = createProductsRequestDto.ToProductsFromCreateDto();
            await _products.CreateProductsAsync(productModel);

            // var productModel = new Products
            //         {
            //             Name = createProductsRequestDto.Name,
            //             Description = createProductsRequestDto.Description,
            //             Price = createProductsRequestDto.Price,
            //             StockLevel = createProductsRequestDto.StockLevel,
            //             CategoryId = createProductsRequestDto.CategoryId, 
            //         };

            return Ok(productModel);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProducts(
            [FromBody] UpdateProductsRequestDto updateProductsRequestDto,
            [FromRoute] int id
        )
        {
            var productModel = await _products.UpdateProductsAsync(updateProductsRequestDto, id);

            if (productModel == null)
            {
                return NotFound();
            }

            return Ok(productModel.ToProductsDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProducts([FromRoute] int id)
        {
            var productModel = await _products.DeleteProductsAsync(id);

            if (productModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
