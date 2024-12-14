using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Stackify.Core.Models;

public class Users : IdentityUser { 

    [MaxLength(255)]
    public string FirstName  {get; set;}
    
    [MaxLength(255)]
    public string LastName  {get; set;}
}
