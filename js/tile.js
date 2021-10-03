class Tile 
{
    // type 1 - normal tile
    // type 2 - player tile
    constructor(row, col, type = 1, color)
    {
        this.row = row;
        this.col = col; 
        this.type = type;
    }
}
