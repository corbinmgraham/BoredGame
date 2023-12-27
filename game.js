class Game {
    constructor() {
        this.board = new Board();

        // Start game loop
    }

    game_loop() {
        // Timer loop for game
    }
}

class Board {
    constructor(MAX_BOARD_SIZE = 5, TILE_SIZE = 40) {
        this.MAX_BOARD_SIZE = MAX_BOARD_SIZE;
        this.TILE_SIZE = TILE_SIZE;

        this.init_board();
    }

    init_board() {
        const container = document.getElementById('game-board');
        container.style.gridTemplateColumns = 'repeat(' + this.MAX_BOARD_SIZE + ',' + this.TILE_SIZE + 'px)';

        for(let i = 0; i < this.MAX_BOARD_SIZE; i++) {
            for(let j = 0; j < this.MAX_BOARD_SIZE; j++) {
                const tile = new Tile(container);
            }
        }
    }
}

class Tile {
    constructor(container) {
        this.init_tile(container);
    }

    init_tile(container) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.addEventListener('click', this.interact);
        tile.addEventListener('dragover', allowDrop);
        tile.addEventListener('drop', drop);
        container.appendChild(tile);
    }

    interact() {
        alert("Hello from " + 0);
    }

}

class TowerTile extends Tile {
    constructor(container) {
        super(container);
    }
}

const size = 9;
// Initial Sudoku board (0 represents empty cells)
const initialBoard = [
[5, 3, 0, 0, 7, 0, 0, 0, 0],
[6, 0, 0, 1, 9, 5, 0, 0, 0],
[0, 9, 8, 0, 0, 0, 0, 6, 0],
[8, 0, 0, 0, 6, 0, 0, 0, 3],
[4, 0, 0, 8, 0, 3, 0, 0, 1],
[7, 0, 0, 0, 2, 0, 0, 0, 6],
[0, 6, 0, 0, 0, 0, 2, 8, 0],
[0, 0, 0, 4, 1, 9, 0, 0, 5],
[0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Function to create the Sudoku board
function createBoard() {
const boardContainer = document.getElementById('sudoku-board');
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (initialBoard[i][j] !== 0) {
        cell.textContent = initialBoard[i][j];
        cell.classList.add('initial-cell');
    }
    cell.addEventListener('dragover', allowDrop);
    cell.addEventListener('drop', drop);
    boardContainer.appendChild(cell);
    }
}
}

// Function to create the options box
function createOptionsBox() {
const optionsBox = document.getElementById('options-box');
for (let i = 1; i <= 9; i++) {
    const option = document.createElement('div');
    option.classList.add('option');
    option.textContent = i;
    option.draggable = true;
    option.addEventListener('dragstart', drag);
    optionsBox.appendChild(option);
}
}

// Event handler for drag start
function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
}

// Event handler for drag over
function allowDrop(event) {
    event.preventDefault();
}

// Event handler for drop
function drop(event) {
    event.preventDefault();
    const value = event.dataTransfer.getData('text/plain');
    event.target.textContent = value;
}

// Function to update the Sudoku board with the solved values
function updateBoard(board) {
const boardContainer = document.getElementById('sudoku-board');
const cells = boardContainer.querySelectorAll('.cell');
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
    const index = i * 9 + j;
    const value = board[i][j];
    cells[index].textContent = value;
    cells[index].classList.add('solved-cell');
    }
}
}

// Initialize the Sudoku board and options box
const game = new Game();
// createBoard();
createOptionsBox();