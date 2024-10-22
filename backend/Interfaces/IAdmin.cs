using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Interfaces;

public interface IAdmin
{
    Task<List<Users>> GetAllUsersAsync();
}