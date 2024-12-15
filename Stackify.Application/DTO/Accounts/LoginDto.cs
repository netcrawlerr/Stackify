using System.ComponentModel.DataAnnotations;

namespace Stackify.Application.DTO.Accounts;

public class LoginDto
{
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
