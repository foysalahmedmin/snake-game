// Controller Buttons;
const controllers = document.getElementById('controllers')
const up = document.getElementById('up')
const down = document.getElementById('down')
const left = document.getElementById('left')
const right = document.getElementById('up')

// Block Size;
const blockSizeDiv = document.getElementById('blockSize');
const blockSize = window.getComputedStyle(blockSizeDiv).getPropertyValue("font-size").slice(0, -2);

// Board;
const block_size = +blockSize;
const rows = 20;
const cols = 20;
let board;
let boardCanvas;

// snake;
let snakeX = block_size * 5;
let snakeY = block_size * 5;

let move_directionX = 0;
let move_directionY = 0;

const snake_body = [];

// food;
let foodX;
let foodY;

// game over;
let game_over = false;

window.onload = () => {
    board = document.getElementById("game-board");
    board.height = rows * block_size;
    board.width = cols * block_size;
    boardCanvas = board.getContext("2d");

    document.onkeyup = changeDirection;

    foodPosition();
    // update();
    let updating = setInterval(() => { update() }, 100)

}

const update = () => {
    // stop updating ;
    if (game_over) {
        return false;
    }

    boardCanvas.fillStyle = "black";
    boardCanvas.fillRect(0, 0, board.width, board.height);

    boardCanvas.fillStyle = "red";
    boardCanvas.fillRect(foodX, foodY, block_size, block_size);

    if (snakeX == foodX & snakeY == foodY) {
        snake_body.push([foodX, foodY]);
        foodPosition();
    }

    for (let i = snake_body.length - 1; i > 0; i--) {
        snake_body[i] = snake_body[i - 1];
    }

    if (snake_body.length) {
        snake_body[0] = [snakeX, snakeY]
    }

    boardCanvas.fillStyle = "lime";
    snakeX += move_directionX * block_size;
    snakeY += move_directionY * block_size;
    boardCanvas.fillRect(snakeX, snakeY, block_size, block_size);

    for (let i = 0; i < snake_body.length; i++) {
        boardCanvas.fillRect(snake_body[i][0], snake_body[i][1], block_size, block_size);
    }

    // game over condition;
    if (snakeX < 0 || snakeX > rows * block_size || snakeY < 0 || snakeY > cols * block_size) {
        // game over for cross the area;
        game_over = true;
        alert("Game Over");
    }
    for (let i = 0; i < snake_body.length; i++) {
        // game over for eat self ;
        if (snakeX == snake_body[i][0] && snakeY == snake_body[i][1]) {
            game_over = true;
            alert("Game Over");
        }
    }

}

// food positioning;
const foodPosition = () => {
    foodX = Math.floor(Math.random() * cols) * block_size;
    foodY = Math.floor(Math.random() * rows) * block_size;
}

// snake direction;
const changeDirection = (e) => {
    if (e.keyCode == "38" && move_directionY != 1) {
        move_directionX = 0;
        move_directionY = -1;
    } else if (e.keyCode == "39" && move_directionX != -1) {
        move_directionX = 1;
        move_directionY = 0;
    } else if (e.keyCode == "40" && move_directionY != -1) {
        move_directionX = 0;
        move_directionY = 1;
    } else if (e.keyCode == "37" && move_directionX != 1) {
        move_directionX = -1;
        move_directionY = 0;
    }
}

// direction by button;
controllers.onclick = (e) => {
    console.log(e.target.getAttribute('id'))
    const targetPoint = e.target.getAttribute('id')
    if (targetPoint == "up" && move_directionY != 1) {
        move_directionX = 0;
        move_directionY = -1;
    } else if (targetPoint == "right" && move_directionX != -1) {
        move_directionX = 1;
        move_directionY = 0;
    } else if (targetPoint == "down" && move_directionY != -1) {
        move_directionX = 0;
        move_directionY = 1;
    } else if (targetPoint == "left" && move_directionX != 1) {
        move_directionX = -1;
        move_directionY = 0;
    }
}