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

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateSupplier([FromBody] UpdateSupplierRequestDto updateSupplierRequestDto,
        [FromRoute] int id)
    {
        
        var supplier = await _supplier.UpdateSupplierAsync(updateSupplierRequestDto,id);
        
        if (supplier == null)
        {
            return NotFound("Supplier Not Found!");
        }
        {
            
        }
        return Ok(supplier.ToSupplierDto());
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteSupplier([FromRoute] int id)
    {
        var supplierModel = await _supplier.DeleteSupplierAsync(id);

        if (supplierModel == null)
        {
            return NotFound();
        }

        return NoContent();
    }
    
}
