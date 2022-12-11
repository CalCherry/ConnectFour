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
    const htmlBoard = document.querySelector('#board');

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
    htmlBoard.append(top);

    // Using a for loop to create rows with html tr element equal to the HEIGHT variable, a for loop also creates columns with the html td element and gives them the id = `${y}-{x}`
    // this makes the id dynamic to any change in x and y 
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const playedPiece = document.createElement("div");
    playedPiece.classList.add("piece");
    playedPiece.classlist.add(`player-${currPlayer}`);
    playedPiece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(playedPiece);
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
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
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame

    // switch players
    // TODO: switch currPlayer 1 <-> 2
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

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();