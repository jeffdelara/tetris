class IPiece extends Piece {
    constructor(row, col, type = 2) 
    {
        super(row, col, type);
        this.row = row;
        this.col = col; 
        this.type = type;
        const color = '#d9138a';

        this.tiles = [
            new Tile(this.row, this.col, 2, color),
            new Tile(this.row, this.col + 1, 2, color),
            new Tile(this.row, this.col + 2, 2, color),
            new Tile(this.row, this.col + 3, 2, color)
        ];

        this.flat = true;
    }

    rotate(board)
    {
        let results = false;
        let futureCoors = [];
        
        if(this.flat)
        {
            futureCoors = [
                [ this.tiles[0].row - 1, this.tiles[0].col + 1 ],
                [ this.tiles[1].row, this.tiles[1].col ],
                [ this.tiles[2].row + 1, this.tiles[1].col ],
                [ this.tiles[3].row + 2, this.tiles[1].col ]
            ];
    
            results = this.checkFutureCoors(futureCoors, board);
            
            if(results.canRotate)
            {
                this.flat = !this.flat;
            }
        }
        else 
        {

            futureCoors = [
                [ this.tiles[1].row, this.tiles[0].col - 1 ],
                [ this.tiles[1].row, this.tiles[1].col ],
                [ this.tiles[1].row, this.tiles[1].col + 1 ],
                [ this.tiles[1].row, this.tiles[1].col + 2 ]
            ];
    
            results = this.checkFutureCoors(futureCoors, board);
            
            if(results.canRotate)
            {
                this.flat = !this.flat;
            }
        }

        if(results.canRotate)
        {
            this.tiles[0].row = futureCoors[0][0];
            this.tiles[0].col = futureCoors[0][1];

            this.tiles[1].row = futureCoors[1][0];
            this.tiles[1].col = futureCoors[1][1];

            this.tiles[2].row = futureCoors[2][0];
            this.tiles[2].col = futureCoors[2][1];

            this.tiles[3].row = futureCoors[3][0];
            this.tiles[3].col = futureCoors[3][1];
        }
    }
}
