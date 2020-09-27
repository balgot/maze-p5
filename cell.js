

/* Represents a cell on the maze. TODO: keeps track of the allowed paths,
and can highlight different parts of the maze */
class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    /* Find coordinates of the edge of the cell */
    edge_coordinates() {
        return {
            x: this.row * SIZE,
            y: this.col * SIZE,
        };
    }

    show() {
        let edge = this.edge_coordinates();

        // Fill with white where the cell is, leaving 1px for border
        fill(255, 255, 255);
        rect(edge.x, edge.y, SIZE - 1, SIZE - 1);
    }
}