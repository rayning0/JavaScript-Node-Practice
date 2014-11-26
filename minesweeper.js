// Raymond Gan
// Creates board of a Minesweeper game, with
// 1. Blank squares ("_")
// 2. Bombs randomly placed ("B")
// 3. Numbers showing how many bombs are 1 square away from each square.
// Leaves blank the squares with 0 bombs 1 square away.

console.log("Make a Minesweeper game board.");

var prompt = require('prompt');
prompt.message = "# of";
prompt.delimiter = " ";
prompt.start();

prompt.get(['Rows', 'Cols'], function (err, result) {
  if (err) { return onErr(err); }
  var rows = parseInt(result.Rows);
  var cols = parseInt(result.Cols);
  console.log(makeBoard(rows, cols));
});

function onErr(err) {
  console.log(err);
  return 1;
}

function makeBoard(cols, rows) {
  var board = new Array(cols);
  for (var c = 0; c < cols; c++) {
    board[c] = new Array(rows);
    for (var r = 0; r < rows; r++) {
      putInBombs(board, c, r);
    }
  }
  putInNumbers(board, cols, rows);
  return board;
}

function putInBombs(board, col, row) {
  if (Math.floor(Math.random() * 4) === 1) {
    board[col][row] = "B";
  } else {
    board[col][row] = "_";
  }
}

function numBombsNear(board, c, r, cols, rows) {
  var count = 0;
  for (var col = c - 1; col <= c + 1; col++) {
    if (col < 0 || col === cols ) continue;
    for (var row = r - 1; row <= r + 1; row++) {
      if (row < 0 || row === rows ) continue;
      if (col === c && row === r) continue;
      if (board[col][row] === "B") count++;
    }
  }
  if (board[c][r] != "B" && count != 0)
    { board[c][r] = count.toString(); }
}

function putInNumbers(board, cols, rows) {
  for (var c = 0; c < cols; c++) {
    for (var r = 0; r < rows; r++) {
      numBombsNear(board, c, r, cols, rows);
    }
  }
}

/* OUTPUT

Make a Minesweeper game board.
# of Rows  10
# of Cols  10
[ [ '1', '2', 'B', '2', '2', '3', 'B', '2', '1', '1' ],
  [ 'B', '2', '1', '2', 'B', 'B', '4', '4', 'B', '3' ],
  [ '1', '1', '_', '1', '4', 'B', 'B', '3', 'B', 'B' ],
  [ '1', '2', '1', '1', '2', 'B', '4', '3', '3', '2' ],
  [ 'B', '3', 'B', '1', '1', '1', '3', 'B', '3', '1' ],
  [ 'B', '4', '2', '1', '_', '_', '2', 'B', 'B', '1' ],
  [ '3', 'B', '2', '_', '_', '_', '1', '2', '2', '1' ],
  [ '3', 'B', '3', '1', '_', '1', '1', '2', '2', '2' ],
  [ 'B', '4', 'B', '1', '_', '1', 'B', '4', 'B', 'B' ],
  [ '2', 'B', '2', '1', '_', '1', '2', 'B', 'B', '3' ] ]

*/