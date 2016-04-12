var cells = [];
var cellsBuffer = []; // as states change on the board, we need a buffer to compare states
var screenWidth = screen.availWidth;
var screenHeight = screen.availHeight;
var cellSize = 10;
var aliveProbability = 15; // percent chance that cell is alive upon seed
var colors;
var birthColor = 0;
var colorIncrement = 5;
var totalColors = 360;

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(100);
  // create an array of all 360 colors on HSL spectrum to loop through
  // this prevents caching
  colors = Array.apply(null, Array(totalColors)).map(function(_, num) {
    return color('hsl(' + num + ',100%, 50%)');
  });
  populateGrid();
}

function draw() {
  // array to collect any cell that changes state when life rules applied
  var changedCells = [];
  cells.forEach(function(row) {
    row.forEach(function(cell) {
      fill(cell.color);
      rect(cell.x, cell.y, cellSize, cellSize);
      if (applyLifeRules(cell)) {
        changedCells.push(cell);
      }
    });
  });

  birthColor += (colorIncrement / 5);
  birthColor = birthColor % totalColors;

  changedCells.forEach(function(changedCell, index) {
    // replace qualities in buffer with new cell
    bufferCell = cellsBuffer[changedCell.row][changedCell.column];
    bufferCell.alive = changedCell.alive;
    bufferCell.b = changedCell.b;
  });

}

/* Detect all neighbors for a given cell and then apply Conway's life rules:
 1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
 2. Any live cell with more than three live neighbours dies, as if by over-population.
 3. Any live cell with two or three live neighbours lives on to the next generation.
 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */
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

  var cellChanged = false;
  if (cell.alive) {
    if (totalNeighbors < 2 || totalNeighbors > 3) {
      cell.die();
      cellChanged = true;
    } else if (totalNeighbors == 2 || totalNeighbors == 3) {
      cell.incrementColor();
    }
  } else {
    if (totalNeighbors == 3) {
      cell.birth();
      cellChanged = true;
    } else {
      // cell.fade();
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
      alive = random(1, 100) <= aliveProbability;
      cell = new Cell(x, y, i, j, alive);
      cellCopy = new Cell(x, y, i, j, alive);
      cells[i].push(cell);
      cellsBuffer[i].push(cellCopy);
      x += cellSize;
    }
    y += cellSize;
  }
}

function Cell(x, y, row, column, alive) {
  this.x = x;
  this.y = y;
  this.row = row;
  this.column = column;
  this.neighbors = 0;
  this.alive = alive;
  this.colorKey = 0;
  this.colorFade = 0;

  // set colors for drawing
  this.color = this.alive ? colors[birthColor] : color('hsl(1 ,100%, 0%)');

  this.die = function() {
    this.color = color('hsl(1 ,100%, 0%)');
    this.alive = false;

  }

  this.birth = function() {
    this.color = colors[birthColor];
    this.alive = true;
  }

  this.incrementColor = function() {
    this.colorKey += colorIncrement;
    this.colorKey = this.colorKey % totalColors;
    this.color = colors[this.colorKey];
  }

}
