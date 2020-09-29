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

/* Cells with the solution */
let solution = [];

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
    frameRate(60);

    // Generate and solve immediately
    generate();
    for (let x of generator);
    dfs();
    for (let x of generator);
}


/* Logic of the app. Called once per draw(). */
function logic() {
    if (generator)
        if (generator.next()["done"])
            current = undefined;
}


/* Displays the solution, picks still the same color. */
function display_solution() {
    if (solution === [])
        return;
    let alpha = 6;
    for (let sol of solution) {
        let r = (41 + alpha) % 251;
        let g = (200 + alpha * 2) % 251;
        let b = (120 + alpha * 7) % 251;
        sol.show(color(r, g, b, 40));
        alpha *= alpha;
    }
}


/* Draw all the elements, TODO: add logic here */
function draw() {
    // Run functions
    logic();

    // Display all the cells
    for (let i = 0; i < rows; ++i)
        for (let j = 0; j < cols; ++j)
            grid[i][j].show();

    // If we have solved the maze, disply the solution
    display_solution();

    // Set colors to start, end and current
    if (start)
        start.highlight(color(5, 153, 7, 100));
    if (end)
        end.highlight(color(168, 17, 12, 100));
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
    solution = [];
}


