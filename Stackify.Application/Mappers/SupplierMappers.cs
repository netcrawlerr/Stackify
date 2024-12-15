namespace Stackify.Application.Mappers;

public static class SupplierMappers
{
    public static SupplierDto ToSupplierDto(this Supplier supplierModel)
    {
        return new SupplierDto
        {
            Id = supplierModel.Id,
            SupplierName = supplierModel.SupplierName,
            Category = supplierModel.Category,
            Rating = supplierModel.Rating,
            Email = supplierModel.Email,
            Phone = supplierModel.Phone,
            DateJoined = supplierModel.DateJoined,
            MostSoldItem = supplierModel.MostSoldItem,
            Status = supplierModel.Status,
            
           
        };
    }
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
    } public static Supplier ToSupplierFromUpdateDto(
        this UpdateSupplierRequestDto updateSupplierRequestDto
    )
    {
        return new Supplier
        {
            SupplierName = updateSupplierRequestDto.SupplierName,
            Category = updateSupplierRequestDto.Category,
            Rating = updateSupplierRequestDto.Rating,
            Email = updateSupplierRequestDto.Email,
            Phone = updateSupplierRequestDto.Phone,
            DateJoined = updateSupplierRequestDto.DateJoined,
            MostSoldItem = updateSupplierRequestDto.MostSoldItem,
            Status = updateSupplierRequestDto.Status,
        };
    }
}
