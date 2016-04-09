var cells = [];
var cellsBuffer = []; // as states change on the board, we need a buffer to compare states
var screenWidth = 800; //screen.availWidth;
var screenHeight = 400; //screen.availHeight;
var cellSize = 40;
var aliveProbability = 15; // percent chance that cell is alive upon seed

function setup() {
  createCanvas(screenWidth, screenHeight);
  background(0);
  populateGrid();
  noLoop();
}

function draw() {
  // keep track of all cells that changed when life's rules are applied
  var changedCells = [];
  cells.forEach(function(row, row_index) {
    row.forEach(function(cell, column_index) {
      applyLifeRules(cell);
      fill(cell.r, cell.g, cell.b);
      rect(cell.x, cell.y, cellSize, cellSize);
    });
  });

}

function applyLifeRules(cell) {
  // var eighbors = 0;

  function _countAliveNeighbors(row, column) {
    if (cellsBuffer[row] && cellsBuffer[row][column]) {
      var neighborCell = cellsBuffer[row][column];
      if (neighborCell.alive) {
        cell.neighbors++;
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

  console.log("Cell in consideration: ");
  console.log(cell);
  console.log(cell.neighbors);
  // console.log();
  console.log("----------");


  /* Apply Conway's life rules to cell:
     1. Any live cell with fewer than two live neighbors dies, as if caused by under-population.
     2. Any live cell with more than three live neighbours dies, as if by over-population.
     3. Any live cell with two or three live neighbours lives on to the next generation.
     4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. */
  // if (cell.alive) {
  //   if (totalNeighbors < 2 || totalNeighbors > 3) {
  //     cell.die();
  //   } else if (totalNeighbors == 2 || totalNeighbors == 3) {
  //   // increment color
  //   }
  // }
  // if (totalNeighbors)
  // } else {
  //   if (totalNeighbors == 3) {
  //     cell.birth();
  //   }
  // }

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

  this.die = function() {
    this.b = 0;
    this.alive = false;
  }

  this.birth = function() {
    this.b = 100;
    this.alive = true;
  }

}


