/* Grid with all the cells (2D array from top left) */
let grid = [];

/* Width = Height of a cell (px) */
const SIZE = 40;

/* Dimensions of the maze table */
let cols = 0;
let rows = 0;



/* Prepare the environment, create buttons, sliders and canvas */
function setup() {
    // Create canvas fullscreen TODO: add 
    let canvas = createCanvas(640, 480);

    // Position the canvas within the correct parent element
    canvas.parent("content");

    // Calculate dimensions
    cols = int(height / SIZE);
    rows = int(width / SIZE);

    // Create the grid
    for (let i = 0; i < rows; ++i) {
        grid.push([]);
        for (let j = 0; j < cols; ++j)
            grid[i].push(new Cell(i, j));
    }
}


/* Draw all the elements, TODO: add logic here */
function draw() {
    // Set dark background
    background(51);

    // Display all the cells
    for (let i = 0; i < rows; ++i)
        for (let j = 0; j < cols; ++j)
            grid[i][j].show();
}