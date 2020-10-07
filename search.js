
/* Returns true if there is a wall between cells @a and @b. */
// Assumes the cells are adjancent 
function is_wall(a, b) {
    if (a.row < b.row)
        return b.walls[0];
    if (a.row > b.row)
        return a.walls[0];
    if (a.col < b.col)
        return b.walls[1];
    return a.walls[1];
}


/* Returns array with the cells that are accessible from @cell, from the candidate
array @all_neighbours. */
function get_accessible_neighbours(cell, all_neighbours) {
    let accessible = [];
    for (let x of all_neighbours)
        if (!is_wall(cell, x))
            accessible.push(x);
    return accessible;
}



/******************************************
/* DFS - analogy to generate
/******************************************/

/* Recursively performs one step of DFS search. */
function* dfs_rec(cell, visited, depth=0) {
    solution.push(cell);
    if (cell === end) {
        /*solution = [];
        solution.push(cell);*/
        yield true;
        return;
    }

    visited[cell.row][cell.col] = true;
    let all_neighbours = available_cells(cell, visited);
    let next_cells = get_accessible_neighbours(cell, all_neighbours);

    for (let next_cell of next_cells) {
        current = cell;
        yield false;
        if (visited[next_cell.row][next_cell.col])
            return false;
        for (x of dfs_rec(next_cell, visited)) {
            if (x) {
                solution.push(cell);
                yield x;
                return;
            }
            yield x;
        }
    }

    current = cell;
    solution.pop(cell);
    yield false;
}


/* Uses DFS to find solution to the maze. */
function* dfs_maze() {
    let visited = [];
    let solution = [];
    for (let i = 0; i < rows; ++i) {
        visited.push([]);
        for (let j = 0; j < cols; ++j)
            visited[i].push(false);
    }
    let gen = dfs_rec(start, visited);
    for (let x of gen)
        if (x) break;
        else yield x;
    generator = undefined;
    current = undefined;
}


/* Wrapper around dfs */
function dfs() {
    solution = [];
    generator = dfs_maze();
}