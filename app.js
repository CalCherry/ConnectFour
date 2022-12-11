const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2, using let because player will change
let board = []; // array of rows, each row is array of cells  (board[y][x])

// used fill and map to create a matrix array of rows = HEIGHT and columns = WIDTH variables
function makeBoard() {
    board = Array(HEIGHT).fill().map(() => Array(WIDTH).fill());
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    const board = document.querySelector('#board');

    // Creates html element tr with ID = 'column-top' that is clickable
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    // Using a for loop containing const headCell, td elements are created in proportion to WIDTH variable and given the id = 'x'
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    board.append(top);

    // Using a for loop to create rows with html tr element equal to the HEIGHT variable, a for loop also creates columns with the html td element and gives them the id = `${y}-{x}`
    // this makes the id dynamic to any change in x and y 
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");

        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        board.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    //finds the lowest available y in a column
    //if column is filled returns null
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // creates div element, assigns it class of "piece", assigns it class of current player, appends it to board
    const playedPiece = document.createElement("div");
    playedPiece.classList.add("piece");
    playedPiece.classlist.add(`p${currPlayer}`);
    playedPiece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(playedPiece);
}

/** endGame: announce game end */

function endGame(msg) {
    // alert that adjusts its display based on what finishing condiditon is reached ie win or tie
    alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }

    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.
    // win condiditons
    //checks values of played pieces and if any of these conditions contain the p1 or p2 class then a player has won
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();