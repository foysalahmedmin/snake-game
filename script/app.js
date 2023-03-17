// Board;
const block_size = 25 ;
const rows = 20 ;
const cols = 20 ;
let board;
let boardCanvas;

// snake;
let snakeX = block_size * 5 ;
let snakeY = block_size * 5 ;

let move_directionX = 0 ;
let move_directionY = 0 ;

// food;
let foodX;
let foodY;

window.onload = () => {
    board = document.getElementById("game-board");
    board.height = rows * block_size ;
    board.width = cols * block_size ;
    boardCanvas = board.getContext("2d");
    console.log(board , boardCanvas);

    document.onkeyup = changeDirection ;

    foodPosition();
    // update();
    let updating = setInterval(() => {update()}, 100)

}

const update = () => {
    boardCanvas.fillStyle = "black";
    boardCanvas.fillRect(0, 0, board.width, board.height);

    boardCanvas.fillStyle = "red";
    boardCanvas.fillRect(foodX, foodY, block_size, block_size);

    boardCanvas.fillStyle = "lime";
    snakeX += move_directionX * block_size ;
    snakeY += move_directionY * block_size ;
    boardCanvas.fillRect(snakeX , snakeY , block_size, block_size);

    
}

const foodPosition = () => {
    foodX = Math.floor(Math.random() * cols) * block_size ;
    foodY = Math.floor(Math.random() * rows) * block_size ;
}

const changeDirection = (e) => {
    console.log(e.keyCode);
    if(e.keyCode == "38"){
        move_directionX = 0 ;
        move_directionY = -1 ;
    }else if(e.keyCode == "39"){
        move_directionX = 1 ;
        move_directionY = 0 ;
    }else if(e.keyCode == "40"){
        move_directionX = 0 ;
        move_directionY = 1 ;
    }else if(e.keyCode == "37"){
        move_directionX = -1 ;
        move_directionY = 0 ;
    }

}