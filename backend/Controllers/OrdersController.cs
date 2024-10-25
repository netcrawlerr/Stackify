using backend.DTO;
using backend.Interfaces;
using backend.Mappers;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/order/")]
public class OrdersController : ControllerBase
{
    private readonly IOrder _order;

    public OrdersController(IOrder orderRepo)
    {
        _order = orderRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _order.GetAllOrdersAsync();
        if (orders == null)
        {
            return NotFound("No Orders");
        }
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _order.GetOrderByIdAsync(id);
        if (order == null)
            return NotFound();
        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderDto orderDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        // needs mapper aint it?
        var createdOrder = await _order.CreateOrderAsync(orderDto.ToOrder());
        return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.Id }, createdOrder);
    }
}
