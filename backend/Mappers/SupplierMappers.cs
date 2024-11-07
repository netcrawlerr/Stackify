using backend.DTO.Supplier;
using backend.Models;

namespace backend.Mappers;

public static class SupplierMappers
{
    public static Supplier ToSupplierFromCreateDto(
        this CreateSupplierRequestDto createSupplierRequestDto
    )
    {
        return new Supplier
        {
            SupplierName = createSupplierRequestDto.SupplierName,
            Category = createSupplierRequestDto.Category,
            Rating = createSupplierRequestDto.Rating,
            Email = createSupplierRequestDto.Email,
            Phone = createSupplierRequestDto.Phone,
            DateJoined = createSupplierRequestDto.DateJoined,
            MostSoldItem = createSupplierRequestDto.MostSoldItem,
            Status = createSupplierRequestDto.Status,
        };
    }
}
