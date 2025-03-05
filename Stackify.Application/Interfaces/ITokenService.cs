using Stackify.Core.Models;

namespace Stackify.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Users user);
    }
}
