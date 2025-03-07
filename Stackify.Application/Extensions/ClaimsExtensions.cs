using System.Security.Claims;

namespace Stackify.Application.Extensions;

public static class ClaimsExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        var claim = user.Claims.SingleOrDefault(x =>
            x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")
        );

        return claim?.Value ?? throw new InvalidOperationException("GivenName claim not found.");
    }
}
