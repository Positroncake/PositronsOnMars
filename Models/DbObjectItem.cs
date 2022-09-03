namespace PositronsOnMars.Models;

public class DbObjectItem
{
    public long Id { get; set; }
    public sbyte Type { get; set; }
    public string Name { get; set; } = string.Empty;
    public object? Image { get; set; }
    public sbyte Condition { get; set; }
    public decimal Price { get; set; }
}