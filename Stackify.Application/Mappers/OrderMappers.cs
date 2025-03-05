using Stackify.Application.DTO.Order;
using Stackify.Core.Models;

namespace Stackify.Application.Mappers;

public static class OrderMappers
{
    public static Order ToOrder(this OrderDto orderDto)
    {
        return new Order
        {
            Id = orderDto.Id,
            OrderNumber = orderDto.OrderNumber,
            CustomerId = orderDto.CustomerId,
            OrderDate = orderDto.OrderDate,
            TotalAmount = orderDto.TotalAmount,
            Status = orderDto.Status,
        };
    }
}
