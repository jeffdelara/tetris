class ZPiece extends Piece 
{
    constructor(row, col, type = 2) 
    {
        super(row, col, type);
        this.row = row;
        this.col = col; 
        this.type = type;
        const color = '#12a4d9';

        this.tiles = [
            new Tile(this.row, this.col - 1, 2, color),
            new Tile(this.row , this.col, 2, color),
            new Tile(this.row + 1, this.col, 2, color),
            new Tile(this.row + 1, this.col + 1, 2, color)
        ];

        this.STATE = {
            DOWN: 0,
            UP: 2
        }

        this.state = this.STATE.DOWN;
    }

    rotate(board)
    {
        let results = false;
        let futureCoors = [];
        
        switch (this.state) {
            case this.STATE.DOWN:
                futureCoors = [
                        [ this.tiles[0].row - 1, this.tiles[0].col + 1 ],
                        [ this.tiles[1].row, this.tiles[1].col ],
                        [ this.tiles[2].row - 1, this.tiles[2].col - 1 ],
                        [ this.tiles[3].row, this.tiles[3].col - 2]
                    ];

                results = this.checkFutureCoors(futureCoors, board);

                if(results.canRotate)
                {
                    this.state = this.STATE.UP;
                }
                break;

            case this.STATE.UP: 
                
                futureCoors = [
                    [ this.tiles[0].row + 1, this.tiles[0].col - 1],
                    [ this.tiles[1].row, this.tiles[1].col ],
                    [ this.tiles[2].row + 1, this.tiles[2].col + 1 ],
                    [ this.tiles[3].row, this.tiles[3].col + 2 ]
                ];

                results = this.checkFutureCoors(futureCoors, board);
                
                if(results.canRotate)
                {
                    this.state = this.STATE.DOWN;
                }
                break;
                
            default:
                break;
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
