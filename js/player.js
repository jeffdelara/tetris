class Player 
{
    constructor()
    {
        // this.tiles = null;
        this.piece = null; 
    }

    setPiece(piece)
    {
        this.piece = piece;
        this.setTiles(piece.tiles);
    }

    setTiles(tiles)
    {
        this.tiles = tiles;
    }

    removeTiles()
    {
        this.tiles = null;
    }

    getTileCoors()
    {
        let coors = [];
        for(let tile of this.piece.tiles)
        {
            coors.push([tile.row, tile.col]);
        }

        return coors;
    }

    moveLeft(board)
    {
        
        let blocked = false;

        for(let tile of this.piece.tiles)
        {
            if(tile.col - 1 < 0) 
            {
                blocked = true;
                break;
            }

            if(board[tile.row][tile.col - 1] === 1)
            {
                blocked = true;
                break;
            }
        }

        if(!blocked)
        {
            for(let tile of this.piece.tiles)
            {
                tile.col--;
            }
        }
    }

    moveRight(board)
    {
        let blocked = false;
        
        for(let tile of this.piece.tiles)
        {
            
            if(tile.col + 1 > 9) 
            {
                blocked = true;
                break;
            }

            if(board[tile.row][tile.col + 1] === 1)
            {
                blocked = true;
                break;
            }
        }

        if(!blocked)
        {
            for(let tile of this.piece.tiles)
            {
                tile.col++;
            }
        }
    }

    moveDown(board)
    {
        let blocked = false;

        for(let tile of this.piece.tiles)
        {
            if(tile.row + 1 > board.length - 1) 
            {
                blocked = true;
                break;
            }

            if(board[tile.row + 1][tile.col] === 1)
            {
                blocked = true;
                break;
            }
        }

        if(!blocked)
        {
            for(let tile of this.piece.tiles)
            {
                tile.row++;
            }
        }
    }

    moveUp(board)
    {
        let blocked = false;

        for(let tile of this.piece.tiles)
        {
            if(tile.row - 1 < 0) 
            {
                blocked = true;
                break;
            }

            if(board[tile.row - 1][tile.col] === 1)
            {
                blocked = true;
                break;
            }
        }

        if(!blocked)
        {
            for(let tile of this.piece.tiles)
            {
                tile.row--;
            }
        }
    }

    rotate()
    {
        console.log("ROTATE");
    }
}
