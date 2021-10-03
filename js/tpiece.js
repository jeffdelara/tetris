class TPiece {
    constructor(row, col, type = 2) 
    {
        this.row = row;
        this.col = col; 
        this.type = type;

        this.tiles = [
            new Tile(this.row, this.col - 1, 2),
            new Tile(this.row, this.col, 2),
            new Tile(this.row, this.col + 1, 2),
            new Tile(this.row + 1, this.col, 2)
        ];

        this.STATE = {
            DOWN: 0,
            LEFT: 1, 
            UP: 2, 
            RIGHT: 3
        }

        this.state = this.STATE.DOWN;
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
        switch (this.state) {
            case this.STATE.DOWN:
                const futureLeftCoors = [
                        [ this.tiles[0].row - 1, this.tiles[0].col + 1 ],
                        [ this.tiles[1].row, this.tiles[1].col ],
                        [ this.tiles[2].row + 1, this.tiles[2].col - 1 ],
                        [ this.tiles[3].row - 1, this.tiles[3].col - 1]
                    ];

                const resultLeftCoors = this.checkFutureCoors(futureLeftCoors, board);

                if(resultLeftCoors.canRotate)
                {
                    this.tiles[0].row = futureLeftCoors[0][0];
                    this.tiles[0].col = futureLeftCoors[0][1];

                    this.tiles[1].row = futureLeftCoors[1][0];
                    this.tiles[1].col = futureLeftCoors[1][1];

                    this.tiles[2].row = futureLeftCoors[2][0];
                    this.tiles[2].col = futureLeftCoors[2][1];

                    this.tiles[3].row = futureLeftCoors[3][0];
                    this.tiles[3].col = futureLeftCoors[3][1];

                    this.state = this.STATE.LEFT;
                }
                break;
            
            case this.STATE.LEFT:
                const futureUpCoors = [
                    [ this.tiles[0].row + 1, this.tiles[0].col + 1 ],
                    [ this.tiles[1].row, this.tiles[1].col ],
                    [ this.tiles[2].row - 1, this.tiles[2].col - 1 ],
                    [ this.tiles[3].row - 1, this.tiles[3].col + 1]
                ];

                const resultUpCoors = this.checkFutureCoors(futureUpCoors, board);

                if(resultUpCoors.canRotate)
                {
                    this.tiles[0].row = futureUpCoors[0][0];
                    this.tiles[0].col = futureUpCoors[0][1];

                    this.tiles[1].row = futureUpCoors[1][0];
                    this.tiles[1].col = futureUpCoors[1][1];

                    this.tiles[2].row = futureUpCoors[2][0];
                    this.tiles[2].col = futureUpCoors[2][1];

                    this.tiles[3].row = futureUpCoors[3][0];
                    this.tiles[3].col = futureUpCoors[3][1];

                    this.state = this.STATE.UP;
                }
                break;

            case this.STATE.UP: 
                const futureRightCoors = [
                    [ this.tiles[0].row + 1, this.tiles[0].col - 1 ],
                    [ this.tiles[1].row, this.tiles[1].col ],
                    [ this.tiles[2].row - 1, this.tiles[2].col + 1 ],
                    [ this.tiles[3].row + 1, this.tiles[3].col + 1]
                ];

                const resultRightCoors = this.checkFutureCoors(futureRightCoors, board);
                
                if(resultRightCoors.canRotate)
                {
                    this.tiles[0].row = futureRightCoors[0][0];
                    this.tiles[0].col = futureRightCoors[0][1];

                    this.tiles[1].row = futureRightCoors[1][0];
                    this.tiles[1].col = futureRightCoors[1][1];

                    this.tiles[2].row = futureRightCoors[2][0];
                    this.tiles[2].col = futureRightCoors[2][1];

                    this.tiles[3].row = futureRightCoors[3][0];
                    this.tiles[3].col = futureRightCoors[3][1];

                    this.state = this.STATE.RIGHT;
                }
                break;

            case this.STATE.RIGHT:
                const futureDownCoors = [
                    [ this.tiles[0].row - 1, this.tiles[0].col - 1 ],
                    [ this.tiles[1].row, this.tiles[1].col ],
                    [ this.tiles[2].row + 1, this.tiles[2].col + 1],
                    [ this.tiles[3].row + 1, this.tiles[3].col - 1 ]
                ];

                const resultDownCoors = this.checkFutureCoors(futureDownCoors, board);
                
                if(resultDownCoors.canRotate)
                {
                    this.tiles[0].row = futureDownCoors[0][0];
                    this.tiles[0].col = futureDownCoors[0][1];

                    this.tiles[1].row = futureDownCoors[1][0];
                    this.tiles[1].col = futureDownCoors[1][1];

                    this.tiles[2].row = futureDownCoors[2][0];
                    this.tiles[2].col = futureDownCoors[2][1];

                    this.tiles[3].row = futureDownCoors[3][0];
                    this.tiles[3].col = futureDownCoors[3][1];

                    this.state = this.STATE.DOWN;
                }
                break;
            default:
                break;
        }
        
        // if(this.flat)
        // {
        //     const futureStandingCoors = [
        //         [ this.tiles[0].row - 1, this.tiles[0].col + 1 ],
        //         [ this.tiles[1].row, this.tiles[1].col ],
        //         [ this.tiles[2].row + 1, this.tiles[1].col ],
        //         [ this.tiles[3].row + 2, this.tiles[1].col ]
        //     ];
    
        //     const result = this.checkFutureCoors(futureStandingCoors, board);
            
        //     if(result.canRotate)
        //     {
        //         this.tiles[0].row = futureStandingCoors[0][0];
        //         this.tiles[0].col = futureStandingCoors[0][1];

        //         this.tiles[1].row = futureStandingCoors[1][0];
        //         this.tiles[1].col = futureStandingCoors[1][1];

        //         this.tiles[2].row = futureStandingCoors[2][0];
        //         this.tiles[2].col = futureStandingCoors[2][1];

        //         this.tiles[3].row = futureStandingCoors[3][0];
        //         this.tiles[3].col = futureStandingCoors[3][1];

        //         this.flat = !this.flat;
        //     }
        // }
        // else 
        // {

        //     const futureFlatCoors = [
        //         [ this.tiles[1].row, this.tiles[0].col - 1 ],
        //         [ this.tiles[1].row, this.tiles[1].col ],
        //         [ this.tiles[1].row, this.tiles[1].col + 1 ],
        //         [ this.tiles[1].row, this.tiles[1].col + 2 ]
        //     ];
    
        //     const result = this.checkFutureCoors(futureFlatCoors, board);
            
        //     if(result.canRotate)
        //     {
        //         this.tiles[0].row = futureFlatCoors[0][0];
        //         this.tiles[0].col = futureFlatCoors[0][1];

        //         this.tiles[1].row = futureFlatCoors[1][0];
        //         this.tiles[1].col = futureFlatCoors[1][1];

        //         this.tiles[2].row = futureFlatCoors[2][0];
        //         this.tiles[2].col = futureFlatCoors[2][1];

        //         this.tiles[3].row = futureFlatCoors[3][0];
        //         this.tiles[3].col = futureFlatCoors[3][1];

        //         this.flat = !this.flat;
        //     }
        // }
    }
}
