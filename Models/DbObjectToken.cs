namespace PositronsOnMars.Models;

public class DbObjectToken
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public DateTime Expiry { get; set; }
}