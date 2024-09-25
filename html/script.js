const player = document.getElementById('player');
const obstacle = document.querySelector('.obstacle');
const gameArea = document.getElementById('gameArea');

let playerX = 50;
let playerY = 350; // 400px (altura da área do jogo) - 50px (altura do jogador) - 50px (altura da plataforma)
let playerVelocityY = 0;
let gravity = 0.6;
let isJumping = false;
let isOnGround = true;
let moveLeft = false;
let moveRight = false;
let playerSpeed = 5;

const playerWidth = 50;
const playerHeight = 50;
const obstacleWidth = 50;
const obstacleHeight = 50;
const platformHeight = 50;

// Função de atualização do jogo
function updateGame() {
    // Movimentos esquerda/direita
    if (moveLeft) {
        playerX -= playerSpeed;
    }
    if (moveRight) {
        playerX += playerSpeed;
    }

    // Gravidade e Pulo
    if (!isOnGround) {
        playerVelocityY += gravity;
    }
    playerY += playerVelocityY;

    // Checagem se o jogador está no chão
    if (playerY >= gameArea.offsetHeight - platformHeight - playerHeight) {
        playerY = gameArea.offsetHeight - platformHeight - playerHeight;
        isJumping = false;
        isOnGround = true;
        playerVelocityY = 0;
    }

    // Atualizar posição do jogador
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';

    // Checar colisão com obstáculo
    if (checkCollision(playerX, playerY, playerWidth, playerHeight, obstacle.offsetLeft, obstacle.offsetTop, obstacleWidth, obstacleHeight)) {
        resetPlayer();
    }

    requestAnimationFrame(updateGame);
}

// Função para verificar colisão
function checkCollision(px, py, pw, ph, ox, oy, ow, oh) {
    return !(px + pw < ox || px > ox + ow || py + ph < oy || py > oy + oh);
}

// Função para resetar o jogador ao ponto inicial
function resetPlayer() {
    playerX = 50;
    playerY = gameArea.offsetHeight - platformHeight - playerHeight;
    playerVelocityY = 0;
}

// Controles de movimento e pulo
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveLeft = true;
    }
    if (e.key === 'ArrowRight') {
        moveRight = true;
    }
    if (e.key === 'ArrowUp' && isOnGround) {
        playerVelocityY = -12;
        isOnGround = false;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        moveLeft = false;
    }
    if (e.key === 'ArrowRight') {
        moveRight = false;
    }
});

// Iniciar a atualização do jogo
updateGame();
