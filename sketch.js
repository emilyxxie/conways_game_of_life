var cells = [];
var cellsBuffer = []; // a buffer to compare states against
var screenWidth = 800;//screen.availWidth;
var screenHeight = 400;//screen.availHeight;
var cellSize = 40;
var aliveProbability = 15; // percent chance that cell is alive upon seed

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(0);
  createCellGrid();
  noLoop();
}

function draw() {
  var b = 0;
  cells.forEach(function(row, row_index) {
    row.forEach(function(cell, column_index) {
      applyLifeRules(cell);
      fill(cell.r, cell.g, cell.b);
      rect(cell.x, cell.y, cellSize, cellSize);
    });
  });
}

function applyLifeRules(cell) {
  var totalNeighbors = 0;

  function _determineAlive(row, column) {
    if (cells[row] && cells[row][column]) {
      var neighborCell = cells[row][column];
      if (neighborCell.alive) {
        cell.neighbors++;
      }
    }
  }


  _determineAlive(cell.row - 1, cell.column - 1);  // top left
  _determineAlive(cell.row - 1, cell.column);      // top
  _determineAlive(cell.row - 1, cell.column + 1);  // top right
  _determineAlive(cell.row, cell.column + 1);      // right
  _determineAlive(cell.row + 1, cell.column + 1);  // bottom right
  _determineAlive(cell.row + 1, cell.column);      // bottom
  _determineAlive(cell.row + 1, cell.column - 1);  // bottom left
  _determineAlive(cell.row, cell.column - 1);      // left

}

function createCellGrid() {
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
      cellsBuffer.push(cell);
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
  this.neighbors = 0;
}


