using Stackify.Models;

namespace Stackify.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Users user);
    }
}
