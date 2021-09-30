class Game {
    constructor(canvas, ctx)
    {
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileWidth = 40;
        this.tiles = [];
        this.player = null;
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

        this.createRandomTiles(20);

        // give player tiles
        const tiles = [
            new Tile(0, 0),
            new Tile(0, 1)
            // new Tile(0, 2),
            // new Tile(0, 3)
        ];

        this.player.setTiles(tiles);
    }

    update()
    {
        // main program

        this.encodeTilesToBoard();
        this.encodePlayerTilesToBoard();
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

    run()
    {
        this.update();
        this.draw();
    }
}