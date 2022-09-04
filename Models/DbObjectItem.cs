namespace PositronsOnMars.Models;

public class DbObjectItem
{
    public long Id { get; set; }
    public sbyte Type { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Seller { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public sbyte Condition { get; set; }
    public double Price { get; set; }
}