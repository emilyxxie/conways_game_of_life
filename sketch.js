var cells = [];
var cellsBuffer = []; // as states change on the board, we need a buffer to compare states
var screenWidth = 800;//screen.availWidth;
var screenHeight = 400;//screen.availHeight;
var cellSize = 40;
var aliveProbability = 5; // percent chance that cell is alive upon seed

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(0);
  populateGrid();
  // noLoop();
}

function draw() {
  // keep track of all cells that changed when life's rules are applied
  var changedCells = [];
  cells.forEach(function(row, row_index) {
    row.forEach(function(cell, column_index) {
      // collect cell if it changes state when life rules applied
      if (applyLifeRules(cell)) {
        changedCells.push(cell);
      }
      fill(cell.r, cell.g, cell.b);
      rect(cell.x, cell.y, cellSize, cellSize);
    });
  });

  changedCells.forEach(function(changedCell, index) {
    // replace old cell in buffer with new cell
    cellsBuffer[changedCell.row][changedCell.column] = changedCell;
  });

}

function applyLifeRules(cell) {

  var totalNeighbors = 0;
  function _countAliveNeighbors(row, column) {
    if (cellsBuffer[row] && cellsBuffer[row][column]) {
      var neighborCell = cellsBuffer[row][column];
      if (neighborCell.alive) {
        totalNeighbors++;
      }
    }
  }

  _countAliveNeighbors(cell.row - 1, cell.column - 1);  // top left
  _countAliveNeighbors(cell.row - 1, cell.column);      // top
  _countAliveNeighbors(cell.row - 1, cell.column + 1);  // top right
  _countAliveNeighbors(cell.row, cell.column + 1);      // right
  _countAliveNeighbors(cell.row + 1, cell.column + 1);  // bottom right
  _countAliveNeighbors(cell.row + 1, cell.column);      // bottom
  _countAliveNeighbors(cell.row + 1, cell.column - 1);  // bottom left
  _countAliveNeighbors(cell.row, cell.column - 1);      // left

  /* Apply Conway's life rules to cell:
     1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
     2. Any live cell with more than three live neighbours dies, as if by over-population.
     3. Any live cell with two or three live neighbours lives on to the next generation.
     4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */
  var cellChanged = false;
  if (cell.alive) {
    if (totalNeighbors < 2 || totalNeighbors > 3) {
      cell.die();
      cellChanged = true;

    } else if (totalNeighbors == 2 || totalNeighbors == 3) {
    // increment color
    }
  } else {
    if (totalNeighbors == 3) {
      cell.birth();
      cellChanged = true;
    }
  }
  return cellChanged;

}

function populateGrid() {
  var rows = round(screenHeight / cellSize);
  var columns = round(screenWidth / cellSize);

  var y = 0;
  // rows should correspond to your y coordinate for where to draw on screen
  // i corresponds to which row
  for (var i = 0; i < rows; i++) {
    // columns should correspond to your x coordinate for where to draw on screen
    // j corresponds to which column
    var x = 0;
    cells.push([]);
    cellsBuffer.push([]);
    for (var j = 0; j < columns; j++) {
      cell = new Cell(x, y, i, j);
      cells[i].push(cell);
      cellsBuffer[i].push(cell);
      x += cellSize;
    }
    y += cellSize;
  }
}

function Cell(x, y, row, column) {
  this.x = x;
  this.y = y;
  this.row = row;
  this.column = column;
  this.alive = random(1, 100) <= aliveProbability;

  // set colors for drawing
  this.r = 0;
  this.g = 0;
  this.b = this.alive ? 100 : 0;

  this.die = function() {
    this.b = 0;
    this.alive = false;
  }

  this.birth = function() {
    this.b = 100;
    this.alive = true;
  }

}


