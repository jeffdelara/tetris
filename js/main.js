// Music & Sounds
const volume = 0.4;
const bgMusic = new Audio('../sound/soundtrack.mp3');
let isMusicPlaying = false;
let isShadowOn = false;
bgMusic.preload = 'auto';
bgMusic.volume = volume;
bgMusic.loop = true;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let game = new Game(canvas, ctx, {bgMusic: bgMusic});
const fps = 60;
let player = new Player();

game.setPlayer(player);
game.init();

requestAnimationFrame(animation);

function animation()
{
    if(game.gameState !== game.STATE.END)
    {
        setTimeout(function(){
            game.run();
            requestAnimationFrame(animation);
        }, 1000/fps)
    }
    else 
    {
        game.showGameOver();
        const btn = document.createElement('button');
        btn.textContent = "Restart";

        btn.addEventListener('click', function(){
            game = new Game(canvas, ctx, {bgMusic: bgMusic});
            player = new Player();
            game.setPlayer(player);
            game.init();
            
            if(isMusicPlaying) bgMusic.play();
            shadowOff();

            requestAnimationFrame(animation);
            this.remove();
        });

        const canvasContainer = document.querySelector('#canvas-container');
        canvasContainer.append(btn);
    }
    
}

// Key controls
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
                game.counter = 0;
                if(isMusicPlaying) bgMusic.play();
            } 
            else 
            {
                game.gameState = game.STATE.PAUSE;
                if(isMusicPlaying) bgMusic.pause();
            }
        }
    }

    switch(e.key)
    {
        case 's':
            shadowHandler();
            break;
        case 'm':
            musicHandler();
            break;
    }
});

//  Handlers
function shadowHandler()
{
    if(game.shadow)
    {
        shadowState.textContent = 'OFF';
        shadowBtn.classList.toggle('active');
    }
    else 
    {
        shadowState.textContent = 'ON';
        shadowBtn.classList.toggle('active');
    }
    game.shadow = !game.shadow;
}

function shadowOff()
{
    shadowState.textContent = 'OFF';
    shadowBtn.classList.remove('active');
}

function musicHandler()
{
    if(isMusicPlaying)
    {
        musicState.textContent = 'OFF';
        musicBtn.classList.toggle('active');
        bgMusic.pause();
    }
    else 
    {
        musicState.textContent = 'ON';
        musicBtn.classList.toggle('active');
        bgMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
}

// Events
const shadowBtn = document.querySelector('#shadowbtn');
const shadowState = document.querySelector('.shadowstate');

shadowBtn.addEventListener('click', shadowHandler);

const musicBtn = document.querySelector('#musicbtn');
const musicState = document.querySelector('.musicstate');

musicBtn.addEventListener('click', musicHandler);
