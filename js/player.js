class Player 
{
    constructor()
    {
        this.tiles = null;
    }

    setTiles(tiles)
    {
        for(let tile of tiles)
        {
            tile.type = 2;
        }
        this.tiles = tiles;
    }

    removeTiles()
    {
        this.tiles = null;
    }

    getTileCoors()
    {
        let coors = [];
        for(let tile of this.tiles)
        {
            coors.push([tile.row, tile.col]);
        }

        return coors;
    }

    moveLeft(board)
    {
        let blocked = false;

        for(let tile of this.tiles)
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
            for(let tile of this.tiles)
            {
                tile.col--;
            }
        }
    }

    moveRight(board)
    {
        let blocked = false;
        
        for(let tile of this.tiles)
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
            for(let tile of this.tiles)
            {
                tile.col++;
            }
        }
    }

    moveDown(board)
    {
        let blocked = false;

        for(let tile of this.tiles)
        {
            if(tile.row + 1 > 19) 
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
            for(let tile of this.tiles)
            {
                tile.row++;
            }
        }
    }

    moveUp(board)
    {
        let blocked = false;

        for(let tile of this.tiles)
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
            for(let tile of this.tiles)
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