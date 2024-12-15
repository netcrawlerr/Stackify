namespace Stackify.Core
{
    public class Class1 { }
}




// DTO	Data Transfer Objects (used to map data between layers).	Application Project
// Extensions	Extension methods that can be used across layers (e.g., for adding services to DI container).	Application Project
// Interfaces	Interfaces for services, repositories, etc. (abstractions).	Core Project
// Mappers	Logic for mapping between domain models and DTOs.	Application Project
// Migrations	Entity Framework migrations, typically used for DB schema changes.	Infrastructure Project
// Models	Domain models or entities, representing core business concepts.	Core Project
// Repository	Interface and implementation for data access/repository pattern.	Core Project (interface) & Infrastructure Project (implementation)
// Services	Business logic services or application use case services.	Application Project
