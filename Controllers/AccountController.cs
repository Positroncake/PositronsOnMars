using System.Security.Cryptography;
using DatabaseConnector;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using PositronsOnMars.Models;

namespace PositronsOnMars.Controllers;

[ApiController]
[Route("api/Accounts")]
public class AccountController : ControllerBase
{
    private const int Rounds = 131072;
    private const int TokenTtl = 24;
    
    /// <summary>
    /// Step 1: Check username and password for null or empty |
    /// Step 2: Generate salt |
    /// Step 3: Hash |
    /// Step 4: Store to database |
    /// Step 5: Return an API token.
    /// </summary>
    /// <param name="account">This object stores the requested username and password.</param>
    /// <returns>Returns an HTTP status code.</returns>
    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult> Register([FromBody] DbObjectAccount account)
    {
        // Step 1
        if (account.Username is null or "" || account.Hash is null or "") return BadRequest();

        // Step 2
        var salt = new byte[512 / 8];
        var rng = RandomNumberGenerator.Create();
        rng.GetBytes(salt);

        // Step 3
        byte[] hash = KeyDerivation.Pbkdf2(
            password: account.Hash,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA512,
            iterationCount: Rounds,
            numBytesRequested: 512 / 8);
        string hashString = Convert.ToBase64String(hash);
        string saltString = Convert.ToBase64String(salt);

        // Step 4
        IConnector connector = new Connector();
        var command =
            "INSERT INTO accounts (Username, Hash, Salt, Iterations) VALUES (@Username, @Hash, @Salt, @Iterations)";
        await connector.ExecuteAsync(command, new
        {
            Username = account.Username,
            Hash = hashString,
            Salt = saltString,
            Iterations = Rounds
        });

        // Step 5
        // Generate token
        var token = new byte[384 / 8];
        rng.GetBytes(token);
        string tokenString = Convert.ToBase64String(token);
        
        // Calculate token expiry datetime
        DateTime expiry = DateTime.UtcNow.AddHours(TokenTtl);
        
        // Store to database
        command = "INSERT INTO tokens (Token, Username, Expiry) VALUES (@Token, @Username, @Expiry)";
        await connector.ExecuteAsync(command, new
        {
            Token = tokenString,
            Username = account.Username,
            Expiry = expiry
        });

        return Ok(tokenString);
    }

    /// <summary>
    /// Step 1: Check username and password for null or empty |
    /// Step 2: Check database for user and retrieve if exists |
    /// Step 3: Hash using retrieved salt and iteration count |
    /// Step 4: Compare hash from user and hash from database |
    /// Step 5: Generate API token and return.
    /// </summary>
    /// <param name="request">This object stores the user-supplied username and password.</param>
    /// <returns>Returns an HTTP status code.</returns>
    [HttpPut]
    [Route("Login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        // Step 1
        if (request.Username is null or "" || request.Password is null or "") return BadRequest();
        
        // Step 2
        IConnector connector = new Connector();
        var query = "SELECT * FROM accounts WHERE Username = @Username LIMIT 1";
        List<DbObjectAccount> results = await connector.QueryAsync<DbObjectAccount, dynamic>(query, new
        {
            Username = request.Username
        });
        if (results.Count is 0) return NotFound();
        DbObjectAccount result = results.First();

        // Step 3
        byte[] salt = Convert.FromBase64String(result.Salt);
        byte[] hashFromUser = KeyDerivation.Pbkdf2(
            password: request.Password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA512,
            iterationCount: result.Iterations,
            numBytesRequested: 512 / 8);

        // Step 4
        string userHash = Convert.ToBase64String(hashFromUser);
        string databaseHash = result.Hash;
        if (userHash.Equals(databaseHash) is false) return Unauthorized();

        // Step 5
        // Generate token
        var rng = RandomNumberGenerator.Create();
        var token = new byte[384 / 8];
        rng.GetBytes(token);
        string tokenString = Convert.ToBase64String(token);

        // Calculate token expiry datetime
        DateTime expiry = DateTime.UtcNow.AddHours(TokenTtl);

        // Store to database
        query = "INSERT INTO tokens (Token, Username, Expiry) VALUES (@Token, @Username, @Expiry)";
        await connector.ExecuteAsync(query, new
        {
            Token = tokenString,
            Username = request.Username,
            Expiry = expiry
        });

        return Ok(tokenString);
    }
}