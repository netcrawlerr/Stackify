using backend.DTO;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Stackify.DTO;

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

            if (products == null)
            {
                return null;
            }
            return Ok(products);
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
