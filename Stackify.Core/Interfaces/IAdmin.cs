namespace Stackify.Core.Interfaces;

public interface IAdmin
{
    Task<List<Users>> GetAllUsersAsync();
    Task<Users?> GetByUsernameAsync(string username);
    Task<IdentityResult> DeleteUsernameAsync(string username);
}
