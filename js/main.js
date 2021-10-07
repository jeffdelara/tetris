
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);
const fps = 60;
const player = new Player();

game.setPlayer(player);
game.init();

// Music & Sounds
const volume = 0.05;
const bgMusic = new Audio('../sound/soundtrack.mp3');

bgMusic.preload = 'auto';
bgMusic.volume = volume;
bgMusic.loop = true;
bgMusic.play();

requestAnimationFrame(animation);

function animation()
{
    setTimeout(function(){
        game.run();
        requestAnimationFrame(animation);
    }, 1000/fps)
}

document.addEventListener('keydown', function(e){
    if(game.gameState === game.STATE.PLAYING)
    {
        switch(e.key)
        {
            case 'ArrowRight':
                game.player.moveRight(game.board);
                break;

            case 'ArrowLeft':
                game.player.moveLeft(game.board);
                break;
            
            case 'ArrowDown':
                game.counter = game.speed;
                break;

            case 'ArrowUp':
                game.player.instantDrop(game.board);
                game.counter = game.speed;
                break;

            case ' ':
                game.player.piece.rotate(game.board);
                break;
        }
    }

    if(game.gameState === game.STATE.PLAYING || game.gameState === game.STATE.PAUSE)
    {
        if(e.key === 'p')
        {
            if(game.gameState === game.STATE.PAUSE) 
            {
                game.gameState = game.STATE.PLAYING;
                bgMusic.play();
                game.counter = 0;
            } 
            else 
            {
                game.gameState = game.STATE.PAUSE;
                bgMusic.pause();
            }
        }
        
    }
});
