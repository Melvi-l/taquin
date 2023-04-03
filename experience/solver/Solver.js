import Board from "./Board"
import Queue from "./Queue"

export default class Solver {
    constructor(board) {
        this.currentBoard = board
        this.visited = []
        this.priorityQueue = new Queue()
        this.priorityQueue.enqueue(this.currentBoard)
    } 
    /**
     * Factory to create a initial state with a random board that is solvable
     * @param {*} size is the dimension of the board
     * @returns a new Solver with a random board 
     */
    static fromRandomBoard() {
        let board
        do {
            board = Board.fromRandomBoard()
        } while(!board.isSolvable())
        return new this(board)
    }
    /**
     * Test if a board is already visited
     * @param {Board} board 
     * @returns a boolean representing if the board is already visited (in the visited list)
     * Complexity: C = O(n*size^2) with n the size of visited
     */
    isAlreadyVisited(board) {
        for (let visitedBoard of this.visited) {
            if (board.isEqual(visitedBoard)) {
                return true
            } 
        }
        return false
    }
    /**
     * Add the node neighbors
     * @param {Board} board from which the neighbors should be add
     * Complexity: C = O(1+size(visited)*size(board)^2+size(queue)) = O(size(visited)*size(board)^2 + size(queue))
     */
    addNeighborsToQueue(board) {
        const neighbors = board.getNeighbors()
        for (let neighbor of neighbors) {
            if (!this.isAlreadyVisited(neighbor)) {
                this.priorityQueue.enqueue(neighbor)
                this.visited.push(neighbor)
            }
        }
    }
    /**
     * Apply a* to the initial state
     * @returns a list of Node representing the shortest path to the goal state
     * Complexity: C = O(size(board)^2*log(size(board)^2) + size(board)^2 + size(visited)*size(board)^2 + size(queue) + 1)
     * if we supposed that we can overlook size(queue)
     * C = O(size(board)^2*[log(size(board)^2) + 1 + size(visited)]) = O(size(board)^2*(log(size(board)^2)+size(visited)))
     */
    aStar() {
        if (!this.currentBoard.isSolvable()) { // recheck
            throw Error("Board unsolvable")
        }
        while (!this.currentBoard.isGoal()) {
            this.addNeighborsToQueue(this.currentBoard)
            this.currentBoard = this.priorityQueue.dequeue()
        }
    }
    getPath() {
        const path = []
        let board = this.currentBoard
        while (board.parent) {
            path.unshift(board)
            board = board.parent
        }
        return path
    }
    * getMoveIterator() {
        for (let board of this.getPath()) {
            yield board.move
        }
    }
}
