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

    moveLeft(coors, n)
    {
        for(let tile of coors)
        {
            tile[1] -= n;
        }
    }

    moveRight(coors, n)
    {
        for(let tile of coors)
        {
            tile[1] += n;
        }
    }

    checkFutureCoors(coors, board)
    {
        const adjustment = { canRotate: true, left: 0, right: 0};

        for(let tile of coors)
        {
            console.log(board[tile[0]][tile[1]]);
            if(board[tile[0]][tile[1]] === 1)
            {
                adjustment.canRotate = false;
                break;
            } 

            if(tile[1] < 0) 
            {    
                adjustment.right = Math.abs(0 - tile[1]);
            }

            if(tile[1] > 9) 
            {
                adjustment.left = Math.abs(9 - tile[1]);
            }

            if(tile[0] > board.length - 1) 
            {
                adjustment.canRotate = false;
                break;
            }
        }

        
        if(adjustment.canRotate) 
        {
            if(adjustment.left > 0) 
            {
                this.moveLeft(coors, adjustment.left);
            }

            if(adjustment.right > 0)
            {
                this.moveRight(coors, adjustment.right);
            }
        }
        return adjustment;
    }

    rotate(board)
    {
        
        if(this.flat)
        {
            const futureStandingCoors = [
                [ this.tiles[0].row - 1, this.tiles[0].col + 1 ],
                [ this.tiles[1].row, this.tiles[1].col ],
                [ this.tiles[2].row + 1, this.tiles[1].col ],
                [ this.tiles[3].row + 2, this.tiles[1].col ]
            ];
    
            const result = this.checkFutureCoors(futureStandingCoors, board);
            
            if(result.canRotate)
            {
                this.tiles[0].row = futureStandingCoors[0][0];
                this.tiles[0].col = futureStandingCoors[0][1];

                this.tiles[1].row = futureStandingCoors[1][0];
                this.tiles[1].col = futureStandingCoors[1][1];

                this.tiles[2].row = futureStandingCoors[2][0];
                this.tiles[2].col = futureStandingCoors[2][1];

                this.tiles[3].row = futureStandingCoors[3][0];
                this.tiles[3].col = futureStandingCoors[3][1];

                this.flat = !this.flat;
            }
        }
        else 
        {

            const futureFlatCoors = [
                [ this.tiles[1].row, this.tiles[0].col - 1 ],
                [ this.tiles[1].row, this.tiles[1].col ],
                [ this.tiles[1].row, this.tiles[1].col + 1 ],
                [ this.tiles[1].row, this.tiles[1].col + 2 ]
            ];
    
            const result = this.checkFutureCoors(futureFlatCoors, board);
            
            if(result.canRotate)
            {
                this.tiles[0].row = futureFlatCoors[0][0];
                this.tiles[0].col = futureFlatCoors[0][1];

                this.tiles[1].row = futureFlatCoors[1][0];
                this.tiles[1].col = futureFlatCoors[1][1];

                this.tiles[2].row = futureFlatCoors[2][0];
                this.tiles[2].col = futureFlatCoors[2][1];

                this.tiles[3].row = futureFlatCoors[3][0];
                this.tiles[3].col = futureFlatCoors[3][1];

                this.flat = !this.flat;
            }
        }
    }
}
