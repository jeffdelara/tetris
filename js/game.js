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
            CHECKING: 2
        }
        this.counter = 0;
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

    setPlayer(player)
    {
        this.player = player;
    }

    init()
    {
        canvas.width = this.board[0].length * this.tileWidth;
        canvas.height = this.board.length * this.tileWidth;

        this.createRandomTiles(10);

        // give player tiles
        const tiles = [
            new Tile(0, 0),
            new Tile(0, 1)
            // new Tile(0, 2),
            // new Tile(0, 3)
        ];

        this.player.setTiles(tiles);
        this.gameState = this.STATE.PLAYING;
        this.counter = 0;
    }

    update()
    {
        // main program
        if(this.counter >= 30) 
        {
            this.gameState = this.STATE.CHECKING;
            this.counter = 0;
        }

        switch (this.gameState) {
            case this.STATE.PLAYING:
                break;

            case this.STATE.CHECKING:
                const oldTileCoors = this.player.getTileCoors();
                this.player.moveDown(this.board);
                const newTileCoors = this.player.getTileCoors();

                if(this.didNotMove(oldTileCoors, newTileCoors))
                {
                    // tranfer player.tiles to this.tiles
                    this.transferToGameTiles(this.player.tiles);

                    // remove player tile
                    this.player.removeTiles();

                    // TODO: generate new random piece
                    

                    // give player tiles
                    this.player.setTiles(tiles);

                    this.gameState = this.STATE.PLAYING;
                    this.counter = 0;
                }
                else 
                {
                    console.log('Did move');
                }
                this.gameState = this.STATE.PLAYING;
                break;
        
            default:
                break;
        }

        this.encodeTilesToBoard();
        this.encodePlayerTilesToBoard();
        this.counter++;
    }

    draw()
    {
        this.clearBoard();
        this.drawGridLines();
        this.drawBoard();
    }

    clearBoard()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    transferToGameTiles(playerTiles)
    {
        for(let playerTile of playerTiles)
        {
            playerTile.type = 1;
            this.tiles.push(playerTile);
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
        for(let tile of this.player.tiles)
        {
            this.board[tile.row][tile.col] = tile.type;
        }
    }

    drawBoard()
    {
        const board = this.board;
        const rows = board.length; 
        const cols = board[0].length;
        
        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                this.drawTile(j, i, board[i][j]);
            }
        }
    }

    drawTile(row, col, number)
    {
        if(number !== 0)
        {
            ctx.fillRect(row * this.tileWidth, col * this.tileWidth, this.tileWidth, this.tileWidth);
        }
        
    }

    drawGridLines()
    {
        const board = this.board;
        const tileWidth = this.tileWidth;

        ctx.strokeStyle = "#DDD";
        ctx.lineWidth = 1;
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