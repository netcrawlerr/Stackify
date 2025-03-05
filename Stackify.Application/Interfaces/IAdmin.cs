using Microsoft.AspNetCore.Identity;
using Stackify.Core.Models;

namespace Stackify.Application.Interfaces;

public interface IAdmin
{
    Task<List<Users>> GetAllUsersAsync();
    Task<Users?> GetByUsernameAsync(string username);
    Task<IdentityResult> DeleteUsernameAsync(string username);
}
