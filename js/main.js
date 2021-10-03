
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);
const fps = 60;
const player = new Player();

game.setPlayer(player);
game.init();

requestAnimationFrame(animation);

function animation()
{
    setTimeout(function(){
        game.run();
        requestAnimationFrame(animation);
    }, 1000/fps)
}

document.addEventListener('keydown', function(e){
    switch(e.key)
    {
        case 'ArrowRight':
            game.player.moveRight(game.board);
            break;

        case 'ArrowLeft':
            game.player.moveLeft(game.board);
            break;
        
        case 'ArrowDown':
            // game.player.moveDown(game.board);
            game.counter = game.speed;
            break;

        case 'ArrowUp':
            // game.player.moveUp(game.board);
            break;

        case ' ':
            game.player.piece.rotate(game.board);
            break;
    }
});
