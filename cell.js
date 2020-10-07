const LINE_WIDTH = .5;
const CELL_SIZE = SIZE - LINE_WIDTH;



/* Represents a cell on the maze. TODO: keeps track of the allowed paths,
and can highlight different parts of the maze */
class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        // Top, Left wall
        this.walls = undefined;
        this.x = undefined;
        this.y = undefined;
        this.reset();
    }

    /* Find coordinates of the edge of the cell */
    edge_coordinates() {
        return {
            y: this.row * SIZE,
            x: this.col * SIZE,
        };
    }

    show(clr=color(255, 255, 255, 20)) {
        // Draw borders
        stroke(51, 51, 51, 40);
        strokeWeight(LINE_WIDTH);
        if (this.walls[0])
            line(this.x, this.y, this.x + SIZE, this.y);
        if (this.walls[1])
            line(this.x, this.y, this.x, this.y + SIZE);

        // Fill with white where the cell is, leaving 1px for border
        noStroke();
        fill(clr);
        rect(this.x + LINE_WIDTH*this.walls[0], 
            this.y + LINE_WIDTH*this.walls[1], 
            CELL_SIZE, CELL_SIZE);
    }

    /* Draws little cirlce within the cell of specified color @clr. */
    highlight(clr) {
        noStroke();
        fill(clr);
        for (let r = 0; r < SIZE; r += SIZE/5)
            ellipse(this.x + SIZE/2, this.y + SIZE/2, r);
    }

    /* Turns the cell to initial state */
    reset() {
        this.walls = [true, true];
        let edge = this.edge_coordinates();
        this.x = edge.x;
        this.y = edge.y;
    }
}