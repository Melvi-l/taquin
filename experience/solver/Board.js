import Move from "./Move"
import BITNbInv from "./BITNbInv"

const SIZE = 3

export default class Board {
    constructor(instance, goalInstance, emptyTilePosition, nbMove, move, parent) {
        this.instance = instance
        this.goalInstance = goalInstance ?? Array(SIZE).fill(0).map((_, row) => Array(SIZE).fill(0).map((_, column) => (row < SIZE-1 || column < SIZE-1) ? row * SIZE + column + 1 : 0))
        if (!emptyTilePosition) {
            this.emptyTilePosition = this.getEmptyTilePosition()
        } else {
            this.emptyTilePosition = emptyTilePosition
        }

        this.nbMove = nbMove
        this.distance = this.getDistance()
        this.priority = this.nbMove + this.distance
        this.move = move
        this.parent = parent
    }
    /**
     * Factory to create a random board n*n
     * @param {int} size dimension of the board
     * @returns a new shuffle board (not necessarily solvable)
     * Complexity: C = O(size^2+size^2) = O(size^2)
     */
    static fromRandomBoard() {
        const instance = this.getRandomInstance() 
        return new this(instance, null, null, 0, null, null)
    }
    static getRandomInstance() {
        const array = this.getRandomArray()
        const instance = Array(SIZE)
        for (let row = 0; row < SIZE; ++row) {
            instance[row] = Array(SIZE)
            for (let column = 0; column < SIZE; ++column) {
                instance[row][column] = array.shift()
            }
        }
        return instance
    }
    static getRandomArray() {
        const bitNbInv = new BITNbInv()
        let array
        do {
            array = Array(SIZE ** 2).fill().map((_, index) => index).sort((a, b) => 0.5 - Math.random())
        } while (bitNbInv.getInvCount(array.filter((val) => val!=0))%2)
        return array
    }
    getTile(row, column) {
        if (row<SIZE&&column<SIZE) {
            return this.instance[row][column]
        } else {
            throw new Error("out of the matrix")
        }
    }
    getGoalRow(tileNumber) {
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                if (tileNumber == this.goalInstance[row][column]) {
                    return row
                }
            }
        }
    }
    getGoalColumn(tileNumber) {
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                if (tileNumber == this.goalInstance[row][column]) {
                    return column
                }
            }
        }
    }
    /**
     * Use a Binary Indexed Tree to get the number of inversion in the board
     * @returns the number of inversion in the array extract from the board
     * Complexity: C = O(nlog(n)) = O(size^2log(size^2)) 
     */
    getNumberOfInversion() {
        const bitNbInv = new BITNbInv()
        return bitNbInv.getInvCount(this.toArray(true))
    }
    /**
     * Get the empty tile coordinate
     * @returns an object with a row and a column attribute representing the row and column index of the 0 in the Board
     * Complexity: C = O(size^2)
     */
    getEmptyTilePosition() {
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                const tileNumber = this.getTile(row, column)
                if (tileNumber == 0) {
                    return { row, column }
                }
            }
        }
    }
    /**
     * Get the solvability of the board (using getNumberOfInversion)
     * @returns a boolean representing if the board is solvable
     * Complexity: C = O(nlog(n)) = O(size^2*log(size^2))
     */
    isSolvable() {
        if (SIZE % 2) {
            // odd
            return !(this.getNumberOfInversion() % 2) // even number of inversion
        } else {
            // even
            return (this.getNumberOfInversion() + this.emptyTilePosition.row) % 2 // odd sum of number of inversion and line of empty tile
        }
    }
    aux(array1, array2) {
        if (!Array.isArray(array1) && !Array.isArray(array2)) {
            return array1 === array2
        }
        if (array1.length !== array2.length) {
            return false;
        }
        for (var i = 0, len = array1.length; i < len; i++) {
            if (!this.aux(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Get the equality of two board, use the aux method, implementing a way to compare two ND-Matrix
     * @param {board} otherBoard 
     * @returns a boolean representing if this.board is equal to the otherBoard
     * Complexity: C = O(size^2)
     */
    isEqual(otherBoard) {
        return this.aux(this.instance, otherBoard.instance)
    }
    /**
     * Get if the board is the goal board
     * @returns a boolean representing if the board is equals to the goal board
     * Complexity: C = O(size^2)
     */
    isGoal() {
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                if (this.getTile(row, column) != this.goalInstance[row][column]) {
                    return false
                }
            }
        }
        return true
    }
    /**
     * Get the hamming distance from the goal board
     * @returns an integer representing the hamming distance between the board and the goal board
     * Complexity: C = O(size^2)
     */
    hamming() {
        let distance = 0
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                const tileNumber = this.getTile(row, column)
                if (tileNumber && (row != this.getGoalRow(tileNumber) || column != this.getGoalColumn(tileNumber))) {
                    distance += 1
                }
            }
        }
        return distance
    }
    auxManhattan(tileNumber, row, column) {
        // Vertical
        const goalRow = this.getGoalRow(tileNumber)
        const verticalDistance = Math.abs(row - goalRow)
        // Horizontal
        const goalColumn = this.getGoalColumn(tileNumber)
        const horizontalDistance = Math.abs(column - goalColumn)
        return verticalDistance + horizontalDistance
    }
    /**
     * Get the manhattan distance from the goal board, use auxManhattan that get the manhattan distance of each tile
     * @returns an integer representing the manhattan distance between the board and the goal board
     * Complexity: C = O(size^2)
     */
    manhattan() {
        let distance = 0
        for (let row = 0; row < SIZE; ++row) {
            for (let column = 0; column < SIZE; ++column) {
                const tileNumber = this.getTile(row, column)
                if (tileNumber) {
                    distance += this.auxManhattan(tileNumber, row, column)
                }
            }
        }
        return distance
    }
    getDistance = this.manhattan
    /**
     * Get the possible configuration at the next step
     * @returns a list of Board representing all the next step possible for the board
     * Complexity: C = O(1)
     */
    getNeighbors() {
        const neighbors = []
        const emptyRow = this.emptyTilePosition.row
        const emptyColumn = this.emptyTilePosition.column
        if (0 < emptyRow) {
            // up
            const target = this.instance[emptyRow - 1][emptyColumn]
            const newInstance = this.copyInstance()
            const temp = newInstance[emptyRow][emptyColumn]
            newInstance[emptyRow][emptyColumn] = newInstance[emptyRow - 1][emptyColumn]
            newInstance[emptyRow - 1][emptyColumn] = temp
            neighbors.push(new Board(newInstance, this.goalInstance, { row: emptyRow - 1, column: emptyColumn }, this.nbMove + 1, new Move(target, "down"), this))
        }
        if (emptyRow < SIZE - 1) {
            // down
            const target = this.instance[emptyRow + 1][emptyColumn]
            const newInstance = this.copyInstance()
            const temp = newInstance[emptyRow][emptyColumn]
            newInstance[emptyRow][emptyColumn] = newInstance[emptyRow + 1][emptyColumn]
            newInstance[emptyRow + 1][emptyColumn] = temp
            neighbors.push(new Board(newInstance, this.goalInstance, { row: emptyRow + 1, column: emptyColumn }, this.nbMove + 1, new Move(target, "up"), this))
        }
        if (0 < emptyColumn) {
            // left
            const target = this.instance[emptyRow][emptyColumn - 1]
            const newInstance = this.copyInstance()
            const temp = newInstance[emptyRow][emptyColumn]
            newInstance[emptyRow][emptyColumn] = newInstance[emptyRow][emptyColumn - 1]
            newInstance[emptyRow][emptyColumn - 1] = temp
            neighbors.push(new Board(newInstance, this.goalInstance, { row: emptyRow, column: emptyColumn -  1 }, this.nbMove + 1, new Move(target, "right"), this))
        }
        if (emptyColumn < SIZE - 1) {
            // right
            const target = this.instance[emptyRow][emptyColumn + 1]
            const newInstance = this.copyInstance()
            const temp = newInstance[emptyRow][emptyColumn]
            newInstance[emptyRow][emptyColumn] = newInstance[emptyRow][emptyColumn + 1]
            newInstance[emptyRow][emptyColumn + 1] = temp
            neighbors.push(new Board(newInstance, this.goalInstance, { row: emptyRow, column: emptyColumn + 1 }, this.nbMove + 1, new Move(target, "left"), this))
        }
        return neighbors
    }

    /**
     * Convert the board to an array
     * @param {boolean} deleteZero true if the zero (empty tile) should be deleted
     * @returns a array (size^2, size^2-1 if deleteZero) containing every element of the board, from the left to right, then from top to bottom
     * Complexity: C = O(size^2)
     */
    toArray(deleteZero = false) {
        const result = []
        for (let row=0; row<SIZE; ++row) {
            for (let column=0; column<SIZE; ++column) {
                const tileNumber = this.getTile(row, column)
                if (deleteZero) {
                    if (tileNumber) {
                        result.push(tileNumber)
                    }
                } else {
                    result.push(tileNumber)
                } // <=> (deleteZero&&tileNumber)||!deleteZero
            }
        }
        return result
    }

    /**
     * Copy of the instance
     * @returns a 2D-Array, clone of the board instance
     */
    copyInstance() {
        return JSON.parse(JSON.stringify(this.instance))
    }

    toString() {
        return `
            ${this.getTile(0,0)}, ${this.getTile(0,1)}, ${this.getTile(0,2)},
            ${this.getTile(1,0)}, ${this.getTile(1,1)}, ${this.getTile(1,2)},
            ${this.getTile(2,0)}, ${this.getTile(2,1)}, ${this.getTile(2,2)}
        `
    }
}