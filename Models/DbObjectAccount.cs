namespace PositronsOnMars.Models;

public class DbObjectAccount
{
    public string Username { get; set; } = string.Empty;
    public string Hash { get; set; } = string.Empty;
    public string Salt { get; set; } = string.Empty; 
    public int Iterations { get; set; }
}