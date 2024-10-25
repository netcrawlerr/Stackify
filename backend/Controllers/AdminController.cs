using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/admin/")]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _admin;

        public AdminController(IAdmin admin)
        {
            _admin = admin;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _admin.GetAllUsersAsync();

            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        [HttpPost("users/single")]
        public async Task<IActionResult> GetSingleUser([FromBody] string username)
        {
            var user = await _admin.GetByUsernameAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("users")]
        public async Task<IActionResult> DeleteUser([FromBody] string username)
        {
            var result = await _admin.DeleteUsernameAsync(username);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return NoContent();
        }
    }
}
