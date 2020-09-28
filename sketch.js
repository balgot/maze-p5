/* Grid with all the cells (2D array from top left) */
let grid = [];

/* Width = Height of a cell (px) */
const SIZE = 40;

/* Dimensions of the maze table */
let cols = 0;
let rows = 0;

/* Start of the maze, end of the maze */
let start = undefined;
let end = undefined;

/* Current cell during exploring... */
let current = undefined;

/* Booleans of current operations */
let generating = false;

/* Any generator used during functions */
let generator = undefined;



/* Prepare the environment, create buttons, sliders and canvas */
function setup() {
    // Create canvas fullscreen TODO: add 
    let canvas = createCanvas(640, 480);

    // Set white background
    background(255);

    // Position the canvas within the correct parent element
    canvas.parent("content");

    // Calculate dimensions
    rows = int(height / SIZE);
    cols = int(width / SIZE);

    // Create the grid
    for (let i = 0; i < rows; ++i) {
        grid.push([]);
        for (let j = 0; j < cols; ++j)
            grid[i].push(new Cell(i, j));
    }

    // Set starting and ending point
    start = grid[0][0];
    end = grid[rows - 1][cols - 1];

    // Set framerate to lower
    frameRate(7);
}


/* Logic of the app. Called once per draw(). */
function logic() {
    if (generating && generator)
        generator.next();
}


/* Draw all the elements, TODO: add logic here */
function draw() {
    // Run functions
    logic();

    // Display all the cells
    for (let i = 0; i < rows; ++i)
        for (let j = 0; j < cols; ++j)
            grid[i][j].show();

    // Set colors to start, end and current
    if (start)
        start.highlight(color(5, 153, 7, 20));
    if (end)
        end.highlight(color(168, 17, 12, 20));
    if (current)
        current.show(color(4, 176, 153, 255));
}


/* Returns grid to original state */
function clear_maze() {
    console.log("Clearing...");
    current = undefined;
    generator = undefined;
    for (let row of grid)
        for (let cell of row)
            cell.reset();
}


/*************************************************
/*  Functions with moving **start** and **end** 
/*************************************************/

/* Cell being dragged */
let dragged_cell = undefined;

/* Offset from mouse coords to left top corner */
let offset_x = undefined;
let offset_y = undefined;


/* Return true if mouse is over given @cell */
function is_mouse_over(cell) {
    return cell.x <= mouseX && mouseX <= cell.x + SIZE
        && cell.y <= mouseY && mouseY <= cell.y + SIZE;
}


function mousePressed() {
    let draggable = [start, end];
    for (let cell of draggable) 
        if (cell && is_mouse_over(cell)) {
            // Mark the draggable cell
            dragged_cell = cell;
            // Create new cell
            let new_cell = new Cell(cell.row, cell.col);
            // Preserve same walls for the new cell
            new_cell.walls = Array.from(cell.walls);
            // Update grid
            grid[cell.row][cell.col] = new_cell;
            // Calculate offset for moving things
            offset_x = dragged_cell.x - mouseX;
            offset_y = dragged_cell.y - mouseY;
            console.log("Dragging [row, col] = " + [cell.row, cell.col])
            return;
        }
}


function mouseDragged() {
    if (dragged_cell) {
        dragged_cell.x = mouseX + offset_x;
        dragged_cell.y = mouseY + offset_y;
    }
}


function mouseReleased() {
    if (!dragged_cell)
        return;

    // TODO: does not work
    if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
        console.log("Mouse left outside grid, reset position of dragged cell to"
            + dragged_cell.row + " - " + dragged_cell.col);
        let row = dragged_cell.row;
        let col = dragged_cell.col;
        grid[row][col] = dragged_cell;
        console.log(grid[row][col].color + "--" + dragged_cell.color);
    }
    else {  
        // Find previous cell      
        let col = int(mouseX / SIZE);
        let row = int(mouseY / SIZE);
        let prev_cell = grid[row][col];

        // Place dragged cell
        dragged_cell.x = prev_cell.x;
        dragged_cell.y = prev_cell.y;
        dragged_cell.row = row;
        dragged_cell.col = col;
        dragged_cell.walls = Array.from(prev_cell.walls);

        // Update grid
        grid[row][col] = dragged_cell;
    }

    dragged_cell = undefined;
}

