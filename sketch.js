var cells = [];
var cellsBuffer = [];
var screenWidth = 800;//screen.availWidth;
var screenHeight = 400;//screen.availHeight;
var cellSize = 40;

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(0);
  createCellGrid();
  noLoop();
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
  console.log(cells);

  console.log("rows:" + rows);
  console.log("columns:" + columns);
}

function Cell(x, y, row, column) {
  this.x = x;
  this.y = y;
  this.row = row;
  this.column = column;
  this.height = cellSize;
  this.width = cellSize;
  this.alive = false;

}