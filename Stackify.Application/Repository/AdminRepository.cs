using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stackify.Application.Interfaces;
using Stackify.Core.Models;
using Stackify.Infrastructure.Data;

namespace Stackify.Application.Repository;

public class AdminRepository : IAdmin
{
    private readonly ApplicationDBContext _context;
    private readonly UserManager<Users> _userManager;

    public AdminRepository(ApplicationDBContext context, UserManager<Users> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<List<Users>> GetAllUsersAsync()
    {
        // return await _userManager.Users.ToListAsync();
        return await _userManager.Users.ToListAsync();
    }

    public async Task<Users?> GetByUsernameAsync(string username)
    {
        return await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IdentityResult> DeleteUsernameAsync(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
        {
            return IdentityResult.Failed(new IdentityError { Description = "User not found." });
        }

        return await _userManager.DeleteAsync(user);
    }
}
