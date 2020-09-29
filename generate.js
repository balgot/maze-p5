


/* Returns true, if given @row ~ y, @col ~ x coordinates are valid */
function validate(row, col) {
    return 0 <= col && col < cols
        && 0 <= row && row < rows;
}


/* Returns array with cells, that might be visited from @cell, those
that are not yet marked in @visited 2D array. */
function available_cells(cell, visited) {
    let row = cell.row;
    let col = cell.col;
    let available = [];

    // Top cell
    if (validate(row - 1, col) && !visited[row - 1][col])
        available.push(grid[row - 1][col]);
    // Bottom cell
    if (validate(row + 1, col) && !visited[row + 1][col])
        available.push(grid[row + 1][col]);
    // Right cell
    if (validate(row, col + 1) && !visited[row][col + 1])
        available.push(grid[row][col + 1]);
    // Left cell
    if (validate(row, col - 1) && !visited[row][col - 1])
        available.push(grid[row][col - 1]);

    /* let row_directions = [-1, 0, 1];
    let col_directions = [-1, 0, 1];
    let neighbours = [];

    // Make sure we always pick only one non-zero direction
    for (let dy of row_directions)
        for (let dx of col_directions)
            if (dy * dx == 0 && validate(dy, dx) && !is_wall(grid[dy][dx], cell))
                neighbours.push(grid[dy][dx]);
    */

    return available;
} 


/* Removes border between cells @a and @b. */
function remove_border(a, b) {
    if (a.row < b.row)  // a over b
        b.walls[0] = false;
    else if (a.row > b.row)  // b over a
        a.walls[0] = false;
    else if (a.col < b.col)  // a to left of b
        b.walls[1] = false;
    else if (a.col > b.col)  // b to left of a
        a.walls[1] = false;
    else
        throw "Same cells to remove border" + a + "-" + b;
}


/* Recursively performs DFS, @visited is 2D array with already visited cells,
@cell is currently being visited cell. */
function* generate_rec(cell, visited) {
    // Mark cell as visited and set it as current
    visited[cell.row][cell.col] = true;

    // Get available cells from current and shuffle them
    let next_cells = shuffle(available_cells(cell, visited));

    // Create new paths
    for (let next_cell of next_cells) {
        current = cell;
        yield 3;
        if (visited[next_cell.row][next_cell.col])
            return 1;
        remove_border(cell, next_cell);
        for(x of generate_rec(next_cell, visited))
            yield x;
    }

    current = cell;
    yield 2;
}


/* Generates the maze from **start** cell, does NOT stop at the end cell.
Uses DFS-search, so to each place only a single path exists. */
// TODO: performs only one step
function* generate_maze() {
    let visited = [];
    for (let i = 0; i < rows; ++i) {
        visited.push([]);
        for (let j = 0; j < cols; ++j)
            visited[i].push(false);
    }
    let gen = generate_rec(start, visited);
    for (let x of gen)
        yield x;
    generator = undefined;
}


/* Wrapper function called from outside, initialises generator. */
function generate() {
    generator = generate_maze();
}