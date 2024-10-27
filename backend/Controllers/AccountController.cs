using backend.DTO;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/account/")]
public class AccountController : ControllerBase
{
    private readonly UserManager<Users> _userManager;
    private readonly SignInManager<Users> _signinManager;
    private readonly ITokenService _tokenService;

    public AccountController(
        UserManager<Users> userManager,
        SignInManager<Users> signInManager,
        ITokenService tokenService
    )
    {
        _userManager = userManager;
        _signinManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (
                string.IsNullOrEmpty(registerDto.UserName)
                || string.IsNullOrEmpty(registerDto.Password)
            )
            {
                return BadRequest("Username and Password are required");
            }

            var user = new Users { UserName = registerDto.UserName, Email = registerDto.Email };

            var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

            if (createdUser.Succeeded)
            {
                return Ok(createdUser);
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrEmpty(loginDto.UserName) || string.IsNullOrEmpty(loginDto.Password))
        {
            return BadRequest("Username and Password are required");
        }

        var user = await _userManager.Users.FirstOrDefaultAsync(x =>
            x.UserName == loginDto.UserName
        );

        if (user == null)
        {
            return Unauthorized("Invalid User");
        }
        var result = await _signinManager.CheckPasswordSignInAsync(
            user,
            loginDto.Password,
            false
        );

        if (!result.Succeeded)
        {
            return Unauthorized("Invalid Credentials !");
        }

        return Ok(
            new NewUserDto
            {
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Token = _tokenService.CreateToken(user),
            }
        );
    }
}
