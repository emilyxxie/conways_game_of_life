var cells = [];
var screenWidth = screen.availWidth / 1.5;
var screenHeight = screen.availHeight / 1.5;
var cellSize = 25;

function setup() {
  createCanvas(screenWidth, screenHeight);
  createCellGrid();
  background(0);
}

function draw() {
  cells.forEach(function (row, index) {
    row.forEach(function (cell, index) {
      playLifeRules(cell, index, row);
      fill(cell.color.r, cell.color.g, cell.color.b);
      rect(cell.y, cell.x, cell.height, cell.width);
    });
  });
}

function createCellGrid() {
  var numberCellsX = screenWidth / cellSize;
  var numberCellsY = screenHeight / cellSize;
  var y = 0;
  for (var i = 0; i <= numberCellsX; i++) {
    x = 0;
    // create a new row in array for each row in grid
    cells.push([]);
    for (var j = 0; j <= numberCellsY; j++) {
      cell = new Cell(x, y);
      cells[i].push(cell);
      x += cellSize;
    }
    y += cellSize;
  }
}

/*
Apply Conway's life rules to each cell:
1.  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2.  Any live cell with two or three live neighbours lives on to the next generation.
3.  Any live cell with more than three live neighbours dies, as if by over-population.
4.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
function playLifeRules(cell, x, y) {

  function _getCell(x, y) {
    if (cells[x] && cells[x][y]) {
      return cells[x][y];
    } else {
      return undefined;
    }
  }

  totalNeighbors = 0;

    tr: _getCell(x-1, y-1),
    t:  _getCell(x, y-1),
    tl: _getCell(x+1, y-1),
    l:  _getCell(x+1, y),
    bl: _getCell(x+1, y+1),
    b:  _getCell(x, y+1),
    br: _getCell(x-1, y+1),
    r:  _getCell(x-1, y)


  // totalNeighbors = 0;
  // Object.keys(neighbors).forEach (function (neighbor) {
  //   neighbor = neighbor.first
  //   if (typeof neighbor.alive != 'undefined' && neighbor.alive) {
  //     console.log(alive);
  //     totalNeighbors++;
  //   };
  // });
  return;
}


function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.height = cellSize;
  this.width = cellSize;

  // randomly determine whether cell is alive upon seeding
  this.alive = (random(1, 50) < 2);

  if (this.alive) {
    this.color = {
      r: 100,
      g: 200,
      b: 300
    }
  } else {
    this.color = {
      r: 0,
      g: 0,
      b: 0
    }
  }

}