using backend.Interfaces;
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

            if (products == null)
            {
                return null;
            }
            return Ok(products);
        }
    }
}
