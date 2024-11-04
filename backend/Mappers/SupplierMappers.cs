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
            Email = createSupplierRequestDto.Email,
            DateJoined = createSupplierRequestDto.DateJoined,
        };
    }
}
