class SquarePiece {
    constructor(row, col, type = 2) 
    {
        this.row = row;
        this.col = col; 
        this.type = type;
        const color = '#d9a5b3';

        this.tiles = [
            new Tile(this.row, this.col, 2, color),
            new Tile(this.row, this.col + 1, 2, color),
            new Tile(this.row + 1, this.col, 2, color),
            new Tile(this.row + 1, this.col + 1, 2, color)
        ];

        this.flat = true;
    }

    rotate()
    {
        console.log("You cant rotate this piece.")
    }
}
