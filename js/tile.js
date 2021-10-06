class Tile 
{
    // type 1 - normal tile
    // type 2 - player tile
    constructor(row, col, type = 1, color = "#000000")
    {
        this.row = row;
        this.col = col; 
        this.type = type;
        this.color = color;
        this.width = 35;
    }
}
