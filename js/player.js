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

    getDistance(board)
    {
        const distances = [];
        const bottom = board.length - 1;

        for(let tile of this.piece.tiles)
        {
            for(let i = tile.row; i < board.length; i++)
            {
                // if hits idle tile
                const distance = i - tile.row;
                if(board[i][tile.col] === 1)
                {
                    distances.push(distance - 1); 
                }

                if(i === bottom)
                {
                    distances.push(distance);
                }
            }
        }

        return Math.min(...distances);
    }

    instantDrop(board)
    {
        const distances = [];
        const bottom = board.length - 1;

        for(let tile of this.piece.tiles)
        {
            for(let i = tile.row; i < board.length; i++)
            {
                // if hits idle tile
                const distance = i - tile.row;
                if(board[i][tile.col] === 1)
                {
                    distances.push(distance - 1); 
                }

                if(i === bottom)
                {
                    distances.push(distance);
                }
            }
        }

        // drop my tiles with the distance
        for(let tile of this.piece.tiles)
        {
            tile.row += Math.min(...distances);
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
