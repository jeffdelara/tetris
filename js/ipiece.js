class IPiece {
    constructor(row, col, type = 2) 
    {
        this.row = row;
        this.col = col; 
        this.type = type;

        this.tiles = [
            new Tile(this.row, this.col, 2),
            new Tile(this.row, this.col + 1, 2),
            new Tile(this.row, this.col + 2, 2),
            new Tile(this.row, this.col + 3, 2)
        ];

        this.flat = true;
    }

    rotate()
    {
        
        
        if(this.flat) 
        {
            const pivotCol = this.tiles[1].col;
            this.tiles[0].row = this.tiles[0].row - 1;
            this.tiles[0].col = this.tiles[0].col + 1;
            
            this.tiles[2].row = this.tiles[2].row + 1;
            this.tiles[2].col = pivotCol;
            
            this.tiles[3].row = this.tiles[3].row + 2;
            this.tiles[3].col = pivotCol;

            this.flat = !this.flat;
        }

        else 
        {
            const pivotRow = this.tiles[1].row;
            this.tiles[0].row = pivotRow;
            this.tiles[0].col = this.tiles[0].col - 1;
            
            this.tiles[2].row = pivotRow;
            this.tiles[2].col = this.tiles[2].col + 1;
            
            this.tiles[3].row = pivotRow;
            this.tiles[3].col = this.tiles[3].col + 2;

            this.flat = !this.flat
        }
    }
}
