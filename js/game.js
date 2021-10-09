class Game {
    constructor(canvas, ctx, {bgMusic})
    {
        this.animationSpeed = 0;
        this.canvas = canvas;
        this.ctx = ctx;
        this.tileWidth = 35;
        this.tiles = [];
        this.completeRows = [];
        this.player = null;
        this.STATE = {
            PLAYING: 1, 
            CHECKING: 2,
            PAUSE: 3,
            REMOVING_TILES: 4,
            GAME_OVER: 5, 
            END: 6
        }
        this.fallSoundEffect = new Audio('../sound/fall.wav');
        this.fallSoundEffect.volume = 0.8;
        this.lineSoundEffect = new Audio('../sound/line.wav');
        this.lineSoundEffect.volume = 0.8;

        this.score = 0;
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
            new LPiece(1, 4),
            new SPiece(0, 4), 
            new ZPiece(0, 4),
            new JPiece(1, 4), 
            new IPiece(1, 4),
            new SquarePiece(0, 4),
            new TPiece(0, 4)
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

        this.score = 0;

        this.player.setPiece(this.createRandomPiece());
        this.gameState = this.STATE.PLAYING;
        this.counter = 0;
    }

    checkIfOver()
    {
        const row = 0;
        const colLength = this.board[0].length;
        for(let i = 0; i < colLength; i++)
        {
            if(this.board[row][i] === 1) 
            {
                return true;
            }
        }
        return false;
    }
    
    update()
    {
        const isOver = this.checkIfOver();
        if(isOver) this.gameState = this.STATE.GAME_OVER;

        if(this.counter >= this.speed && this.gameState !== this.STATE.GAME_OVER) 
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
                
                const completeRow = this.checkCompleteRows();

                if(completeRow)
                {
                    this.gameState = this.STATE.REMOVING_TILES;
                }
                else 
                {
                    this.gameState = this.STATE.PLAYING;
                }

                if(isLocked && !completeRow) 
                {
                    // give player new tiles
                    const piece = this.createRandomPiece();
                    // give player tiles
                    this.player.setPiece(piece);
                }
                break;

            case this.STATE.REMOVING_TILES:
                this.removeTileAnimation();
                break;
            
            case this.STATE.PAUSE:
                break;

            case this.STATE.GAME_OVER:
                this.endGame();
                break;

            case this.STATE.END:
                break;

            default:
                break;
        }

        this.encodeTilesToBoard();
        this.encodePlayerTilesToBoard();
    }

    endGame()
    {
        bgMusic.pause();
        this.gameState = this.STATE.END;
    }

    showGameOver()
    {
        const midHeight = canvas.height * .5;
        const midWidth = canvas.width * .5;
        this.ctx.fillStyle = '#000';
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillRect(0, midHeight - 50, canvas.width, 100);
        this.ctx.globalAlpha = 1.0;
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "30px Poppins";
        this.ctx.fillText("Game Over", midWidth - 85, midHeight + 10);
    }

    draw()
    {
        this.clearBoard();
        this.drawBoard();
        this.drawGridLines();
        if(this.gameState === this.STATE.END)
        {
            this.showGameOver();
        }
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

            this.fallSoundEffect.play();

            isLocked = true;
            this.counter = this.speed;
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
        this.completeRows = [];

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
                this.completeRows.push(i);
            }
        }
        if(this.completeRows.length > 0) 
        {
            return true;
        }
        return false;
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

    removeTileAnimation()
    {
        for(let tile of this.tiles)
        {
            for(let completeRow of this.completeRows)
            {
                if(tile.row === completeRow)
                {
                    
                    if(this.animationSpeed % 4 === 0)
                    {
                        tile.width *= Math.sin(.7);
                        tile.color = "#FFFFFF";
                    } 
                    else
                    {
                        tile.color = "#000000";
                    } 
                }
            }   
        }
        if(this.animationSpeed === 15)
        {
            this.removeRow(this.completeRows);
            this.lineSoundEffect.play();
            this.gameState = this.STATE.PLAYING;
            this.animationSpeed = 0;
        }
        this.animationSpeed++;
    }

    dropTiles(rows)
    {
        let level = 0;
        for(let i = 0; i < rows.length; i++)
        {
            rows[i] += level;
            for(let j = 0; j < this.tiles.length; j++)
            {
                const tile = this.tiles[j];
                if(tile.row < rows[i]) 
                {
                    tile.row++;
                }
            }
            level++;
        }
        
        this.computeScore(rows.length);
    }

    computeScore(rowDrop)
    {
        this.score += (rowDrop * 1000) * rowDrop;
        const scoreSpan = document.getElementById('score');
        scoreSpan.textContent = this.score;
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
        this.ctx.fillRect(tile.col * this.tileWidth, tile.row * this.tileWidth, tile.width, tile.width);
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
