using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

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
}
