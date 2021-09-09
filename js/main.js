const x_class = 'x';
const o_class = 'o';

let circleTurn;

// elements
const cellEllements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#board');
const winnignWrapper = document.querySelector('.winning-wrapper');
const winnigText = document.querySelector('.winning-text');
const restartButton = document.querySelector('.restart-btn');

restartButton.addEventListener('click', () => {
    startGame();
});

// get all winning ways
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


startGame();

function startGame() {
    circleTurn = false;
    cellEllements.forEach(cell => {
        cell.classList.remove(o_class);
        cell.classList.remove(x_class);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnignWrapper.classList.remove('show-winning');
    setHoverBoard();
}

// click every cell one time
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? o_class : x_class;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setHoverBoard();
    }
}

// check if draw
function isDraw() {
    return [...cellEllements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    });
}

// end Game and Set Message
function endGame(draw) {
    if (draw) {
        winnigText.innerHTML = `Draw 😐!`;
    } else {
        winnigText.innerHTML = `${circleTurn ? "O's" : "X's"} Win! 😃`;

    }
    winnignWrapper.classList.add('show-winning');
}

// set o || x sign
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// change sign after every click
function swapTurn() {
    circleTurn = !circleTurn;
}

// set sign class to cells parent
function setHoverBoard() {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    board.classList.add(circleTurn ? o_class : x_class);
}


function checkWin(currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellEllements[index].classList.contains(currentClass);
        })
    })
}