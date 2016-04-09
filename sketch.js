var cells = [];
var cellsBuffer = [];
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
      fill(cell.r, cell.g, cell.b);
      rect(cell.x, cell.y, cellSize, cellSize);
    });

  });
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
    for (var j = 0; j < columns; j++) {
      cell = new Cell(x, y, i, j);
      cells[i].push(cell);
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
  this.r = 0;
  this.g = 0;

  if (this.alive) {
    this.b = 100;
  } else {
    this.b = 0;
  }

}