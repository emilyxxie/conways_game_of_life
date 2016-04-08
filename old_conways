var cells = [];
var cellsBuffer = [];
var screenWidth = screen.availWidth;
var screenHeight = screen.availHeight;
var cellSize = 25;

function setup() {
  createCanvas(screenWidth, screenHeight);
  createCellGrid();
  background(0);
  // console.log(cells);
  // console.log(cells);
  noLoop();
  // frameRate(1);
}

function createCellGrid() {
  var numberCellsX = round(screenWidth / cellSize);
  var numberCellsY = round(screenHeight / cellSize);
  var x = 0;
  for (var i = 0; i <= numberCellsY; i++) {
    var y = 0;
    // create a new row in array for each row in grid
    cells.push([]);
    cellsBuffer.push([]);
    for (var j = 0; j <= numberCellsX; j++) {
      cell = new Cell(x, y, i, j);
      cells[i].push(cell);
      cellsBuffer[i].push(cell)
      y += cellSize;
    }
    x += cellSize;
  }
}

function Cell(x, y, row_index, cell_index) {
  this.x = x;
  this.y = y;
  this.height = cellSize;
  this.width = cellSize;
  this.row_index = row_index;
  this.cell_index = cell_index;

  // randomly determine whether cell is alive upon seeding
  this.alive = (random(1, 50) < 5);
  // if ((x == 25 && y == 25) || (x == 50 && y == 25) || (x == 25 && y == 50) ) {
  //   this.alive = true;
  // } else {
  //   this.alive = false;
  // }

  if (this.alive) {
    this.color = {
      r: 0,
      g: 0,
      b: 100
    }
  } else {
    this.color = {
      r: 0,
      g: 0,
      b: 0
    }
  }
}

function draw() {
  var colorb = 0;
  // play life rules first
  var cellsChanged = [];
  cells.forEach(function (row, row_index) {
    row.forEach(function (cell, cell_index) {
      // answer is somewhere here. The way I'm looping isn't as expected.
      playLifeRules(cell, row_index, cell_index);
      cellsChanged.push(cell);
      fill(cell.color.r, cell.color.g, cell.color.b);
      // the flag is set before the loop is complete...need to create a buffer.
      rect(cell.x, cell.y, cell.height, cell.width);
    });
  });

  // after we've drawn out all of the cells and switched states
  // apply changes to buffer for next iteration
  applyCellChanges(cellsChanged);

}


/*

Apply Conway's life rules to each cell:
1.  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2.  Any live cell with two or three live neighbours lives on to the next generation.
3.  Any live cell with more than three live neighbours dies, as if by over-population.
4.  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

*/
function playLifeRules(cell, row_index, cell_index) {

  var totalNeighbors = 0;
  function _determineAlive(row_index, cell_index) {
    if (cells[row_index] && cells[row_index][cell_index]) {
      cell = cells[row_index][cell_index];
      if (cell.alive) {
        totalNeighbors++;
      }
    }
  }

  _determineAlive(row_index - 1, cell_index - 1); //top left
  _determineAlive(row_index - 1, cell_index); // top
  _determineAlive(row_index - 1, cell_index + 1); // top right
  _determineAlive(row_index, cell_index + 1); // right
  _determineAlive(row_index + 1, cell_index + 1); // bottom right
  _determineAlive(row_index + 1, cell_index); // bottom
  _determineAlive(row_index + 1, cell_index - 1); // bottom left
  _determineAlive(row_index, cell_index - 1); // left

  if (totalNeighbors < 2 && cellsBuffer.alive) {
    cell.color.b = 0;
    console.log("cell should die");
    cell.alive = false;
  } else if (totalNeighbors > 3 && cellsBuffer.alive) {
    console.log("cell should die");
    cell.color.b = 0;
    cell.alive = false;
  } else if ((totalNeighbors == 2 || totalNeighbors == 3) && cellsBuffer.alive) {
    cell.color.b = 100;
    console.log("cell should be stable");
    cell.alive = true;
  } else if (totalNeighbors == 3 && !cellsBuffer.alive) {
    cell.color.b = 100;
    console.log("cell should spawn");
    cell.alive = true;

  } else {
    console.log("Black space. Nothing happens.");
  }
  console.log("END OF playLifeRules call");

  return cell;


}

function applyCellChanges(cellsChanged) {
  // console.log(cellsChanged);
  console.log(cellsChanged);
  return;
  cellsChanged.forEach(function(cell, index) {
    cellsBuffer[this.position][this.row] = cell;
  });
}






  // look at all neighbors and determine if alive
  // _determineAlive(x-1, y-1);  // top left
  // _determineAlive(x, y-1);    // top
  // _determineAlive(x+1, y-1);  // top right
  // _determineAlive(x+1, y);    // right
  // _determineAlive(x+1, y+1);  // bottom right
  // _determineAlive(x, y+1);    // bottom
  // _determineAlive(x-1, y+1);  // bottom left
  // _determineAlive(x-1, y);    // left


  // look at all neighbors and determine if alive
  // _determineAlive(row_index - 1, cell_index - 1);  // top left
  // _determineAlive(row_index, cell_index - 1);    // top
  // _determineAlive(row_index + 1, cell_index - 1);  // top right
  // _determineAlive(row_index + 1, cell_index);    // right
  // _determineAlive(row_index + 1, cell_index + 1);  // bottom right
  // _determineAlive(row_index, cell_index + 1);    // bottom
  // _determineAlive(row_index - 1, cell_index + 1);  // bottom left
  // _determineAlive(row_index - 1, cell_index);    // left