const EMPTY_TILE = 0;
const SHIP_TILE = "#";
const HIT_TILE = "*";


////////////////////////////

function buildGrid() {
  var grid = [];

  const rows = 10;
  const cols = 10;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!grid[row]) {
        grid[row] = [];
      }

      grid[row][col] = 0;
    }
  }

  return grid;
}

function placeShipHorizontally(grid, options) {
  if (options.row === undefined) { throw new Error('You must pass `row` property in options hash.' ) }
  if (options.col === undefined) { throw new Error('You must pass `col` property in options hash.' ) }
  if (options.size === undefined) { throw new Error('You must pass `size` property in options hash.' ) }

  const returngrid = Object.assign([], grid);

  const row = options.row;
  const limit = options.col + options.size;

  for (let col = options.col; col < limit; col += 1) {
    if (returngrid[row][col] === EMPTY_TILE) {
      returngrid[row][col] = SHIP_TILE;
    }
    else {
      throw new Error(`Ship already placed at coordinates: (${row},${col})`);
    }
  }
  return returngrid;
}

function placeShipVertically(grid, options) {
  if (options.row === undefined) { throw new Error('You must pass `row` property in options hash.' ) }
  if (options.col === undefined) { throw new Error('You must pass `col` property in options hash.' ) }
  if (options.size === undefined) { throw new Error('You must pass `size` property in options hash.' ) }

  const returngrid = Object.assign([], grid);

  const col = options.col;
  const limit = options.row + options.size;

  for (let row = options.row; row < limit; row += 1) {
    if (returngrid[row][col] === EMPTY_TILE) {
      returngrid[row][col] = SHIP_TILE;
    }
    else {
      throw new Error(`Ship already placed at coordinates: (${row},${col})`);
    }
  }
  return returngrid;
}

function fire(grid, options) {
  if (options.row === undefined) { throw new Error('You must pass `row` property in options hash.' ) }
  if (options.col === undefined) { throw new Error('You must pass `col` property in options hash.' ) }

  const returngrid = Object.assign([], grid);

  const row = options.row;
  const col = options.col;

  if (returngrid[row][col] === EMPTY_TILE) {
    return { result: "MISS", grid: returngrid, row: row, col: col };
  }
  
  if (returngrid[col][row] === HIT_TILE) {
    return { result: "ALREADY HIT", grid: returngrid, row: row, col: col };
  }

  // Direct hit!
  returngrid[row][col] = HIT_TILE;

  return { result: "HIT", grid: returngrid, row: row, col: col };
}

function hasShipsRemaining(grid) {
  for(let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (grid[row][col] !== EMPTY_TILE && grid[row][col] !== HIT_TILE) {
        return true;
      }
    }
  }
  return false;
}

function drawBoard(grid) {
  var contents = "";

  const border = {
    1: 'A', 
    2: 'B', 
    3: 'C', 
    4: 'D', 
    5: 'E', 
    6: 'F', 
    7: 'G', 
    8: 'H', 
    9: 'I', 
    10: 'J'
  }

  // Add headers
  contents = contents + "   1 2 3 4 5 6 7 8 9 10\n";
  contents = contents + "   --------------------\n";

  for(let row = 0; row < grid.length; row += 1) {
    contents = contents + border[row+1] + "  "; // Add row heading 
    for (let col = 0; col < grid[row].length; col += 1) {
      contents = contents + grid[row][col] + " ";
    }
    contents += "\n";
  }

  console.log();
  console.log(contents);
}


module.exports = {
  buildGrid,
  placeShipHorizontally,
  placeShipVertically,
  fire,
  hasShipsRemaining,
  drawBoard
}