


import { getRandomMatrix } from "../utils/matrix";

export default class LifeMatrix {
    private _matrix: number[][];

    constructor(rows: number, columns: number) {
        this._matrix = getRandomMatrix(rows, columns, 0, 1); // Initialize matrix with random 0s and 1s
    }

    get matrix() {
        return this._matrix;
    }

    next(): number[][] {
        const rows = this._matrix.length;
        const columns = this._matrix[0].length;
        const nextGeneration = new Array(rows);

        for (let i = 0; i < rows; i++) {
            nextGeneration[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                const liveNeighbors = this.countLiveNeighbors(i, j, rows, columns);

                if (this._matrix[i][j] === 1) {
                    // Rule 1 and Rule 3: A live cell dies if it has fewer than 2 or more than 3 live neighbors
                    nextGeneration[i][j] = liveNeighbors < 2 || liveNeighbors > 3 ? 0 : 1;
                } else {
                    // Rule 4: A dead cell becomes a live cell if it has exactly 3 live neighbors
                    nextGeneration[i][j] = liveNeighbors === 3 ? 1 : 0;
                }
            }
        }

        this._matrix = nextGeneration;
        return this._matrix;
    }

    private countLiveNeighbors(row: number, col: number, rows: number, columns: number): number {
        let liveNeighbors = 0;

        // Check all 8 surrounding cells
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Skip the current cell
                if (i === 0 && j === 0) continue;

                const neighborRow = row + i;
                const neighborCol = col + j;

                // Check if the neighbor is within bounds
                if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < columns) {
                    liveNeighbors += this._matrix[neighborRow][neighborCol];
                }
            }
        }

        return liveNeighbors;
    }
}
