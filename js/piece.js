class Piece 
{
    constructor(row, col, type = 2)
    {
        this.row = row;
        this.col = col; 
        this.type = type;
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
}
