using backend.DTO.Supplier;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/supplier/")]
public class SupplierController : ControllerBase
{
    private readonly ISupplier _supplier;

    public SupplierController(ISupplier supplier)
    {
        _supplier = supplier;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSuppliers()
    {
        var suppliers = await _supplier.GetAllSupliersAsync();

        if (suppliers == null)
        {
            return NotFound("No Suppliers");
        }
        return Ok(suppliers);
    }

    [HttpPost]
    public async Task<IActionResult> CreateSupplier(
        [FromBody] CreateSupplierRequestDto createSupplierRequestDto
    )
    {
        var supplier = await _supplier.CreateSupplierAsync(
            createSupplierRequestDto.ToSupplierFromCreateDto()
        );
        return Ok(supplier);
    }
}
