class Game {
    constructor(canvas, ctx)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileWidth = 35;
        this.tiles = [];
        this.player = null;
        this.STATE = {
            PLAYING: 1, 
            CHECKING: 2,
            PAUSE: 3
        }
        this.counter = 0;
        this.speed = 35;
        this.gameState = this.STATE.PLAYING;
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        
    }

    // For testing
    createRandomTiles(count)
    {
        for(let i = 0; i < count; i++)
        {
            const randomRow = Math.floor(Math.random() * this.board.length);
            const randomCol = Math.floor(Math.random() * this.board[0].length);
            const tile = new Tile(randomRow, randomCol);
            this.tiles.push(tile);
        }
    }

    createRandomPiece()
    {
        // console.log(new LPiece(1, 3));
        const pieces = [
            new SPiece(1, 3), 
            new ZPiece(1, 3),
            new JPiece(2, 3), 
            new IPiece(1, 3),
            new SquarePiece(1, 4),
            new TPiece(1, 3)
        ];

        const randomIndex = Math.floor(Math.random() * pieces.length);
        const piece = pieces[randomIndex];
        
        return piece;
    }

    setPlayer(player)
    {
        this.player = player;
    }

    init()
    {
        canvas.width = this.board[0].length * this.tileWidth;
        canvas.height = this.board.length * this.tileWidth;

        // this.createRandomTiles(10);

        this.player.setPiece(this.createRandomPiece());
        this.gameState = this.STATE.PLAYING;
        this.counter = 0;
    }

    update()
    {
        // main program
        if(this.counter >= this.speed) 
        {
            this.gameState = this.STATE.CHECKING;
            this.counter = 0;
        }

        switch (this.gameState) {
            case this.STATE.PLAYING:
                this.counter++;
                break;

            case this.STATE.CHECKING:
                const isLocked = this.lockPlayerPiece();
                this.checkCompleteRows();

                if(isLocked)
                {
                    // give player new tiles
                    const piece = this.createRandomPiece();
                    // give player tiles
                    this.player.setPiece(piece);
                }
                
                this.gameState = this.STATE.PLAYING;
                break;
            
            case this.STATE.PAUSE:
                break;

            default:
                break;
        }

        this.encodeTilesToBoard();
        this.encodePlayerTilesToBoard();
    }

    draw()
    {
        this.clearBoard();
        this.drawBoard();
        this.drawGridLines();
    }

    clearBoard()
    {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    transferToGameTiles(playerTiles)
    {
        for(let playerTile of playerTiles)
        {
            playerTile.type = 1;
            this.tiles.push(playerTile);
        }
    }

    lockPlayerPiece()
    {
        const oldTileCoors = this.player.getTileCoors();
        this.player.moveDown(this.board);
        const newTileCoors = this.player.getTileCoors();
        let isLocked = false;

        if(this.didNotMove(oldTileCoors, newTileCoors))
        {
            // tranfer player.tiles to this.tiles
            this.transferToGameTiles(this.player.tiles);
            // remove player tile
            this.player.removeTiles();
            isLocked = true;
            this.counter = 0;
        }
        else 
        {
            isLocked = false;
        }
        return isLocked;
    }

    checkCompleteRows()
    {
        const bottom = this.board.length - 1;
        const rowSize = this.board[0].length;
        let completeRows = [];

        for(let i = bottom; i > 0; i--) 
        {
            let rowScore = 0;
            for(let j = 0; j < rowSize; j++) 
            {
                if(this.board[i][j] === 1) 
                {
                    rowScore++;
                }
            }
            if(rowScore === 10) 
            {
                completeRows.push(i);
                // increaseScore();
            }
        }
        if(completeRows.length > 0)
        {
            this.removeRow(completeRows);
        }
    }

    removeRow(rows)
    {
        for(let i = 0; i < rows.length; i++) 
        {
            for(let j = this.tiles.length - 1; j >= 0; j--)
            {
                if(this.tiles[j].row === rows[i]) 
                {
                    this.tiles.splice(j, 1);
                }
            }
        }

        this.dropTiles(rows);
    }

    dropTiles(rows)
    {
        const rowDrop = rows.length;
        const min = Math.min(...rows);
        
        for(let i = 0; i < this.tiles.length; i++)
        {
            const tile = this.tiles[i];
            if(tile.row < min) 
            {
                tile.row += rowDrop;
            }
        }
    }
    
    encodeTilesToBoard()
    {
        for(let i = 0; i < this.board.length; i++)
        {
            for(let j = 0; j < this.board[0].length; j++)
            {
                this.board[i][j] = 0;
            }
        }

        for(let tile of this.tiles)
        {
            this.board[tile.row][tile.col] = tile.type;
        }
    }

    encodePlayerTilesToBoard()
    {
        for(let tile of this.player.piece.tiles)
        {
            this.board[tile.row][tile.col] = tile.type;
        }
    }

    drawBoard()
    {
        const tiles = this.tiles.concat(this.player.piece.tiles);
        tiles.forEach( tile => {
            this.drawTile(tile);
        });
    }

    drawTile(tile)
    {
        this.ctx.fillStyle = tile.color; 
        this.ctx.fillRect(tile.col * this.tileWidth, tile.row * this.tileWidth, this.tileWidth, this.tileWidth);
    }

    drawGridLines()
    {
        const board = this.board;
        const tileWidth = this.tileWidth;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        const height = board.length;
        const width = board[0].length;
    
        for(let i = 0; i < height; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * tileWidth);
          ctx.lineTo(canvas.width, i * tileWidth);
          ctx.stroke();
        }
    
        for(let i = 0; i < width; i++) {
          ctx.beginPath();
          ctx.moveTo(i * tileWidth, 0);
          ctx.lineTo(i * tileWidth, canvas.height);
          ctx.stroke();
        }
    }

    didNotMove(oldTileCoors, newTileCoors)
    {
        for(let i = 0; i < oldTileCoors.length; i++)
        {
            const oldCoor = oldTileCoors[i];
            const newCoor = newTileCoors[i]
            if(oldCoor[0] !== newCoor[0] || oldCoor[1] !== newCoor[1])
            {
                return false;
            }
        }
        return true;
    }

    run()
    {
        this.update();
        this.draw();
    }
}
