import gsap from "gsap";
import Experience from "../../Experience";
import BoardAdapter from "../../solver/BoardAdapter";
import Solver from "../../solver/Solver";


const DIPLACEMENT = 3.05

export default class BoardAnimations {
    constructor(tileList, duration) {
        this.logger = new Experience().logger
        this.tileList = tileList
        this.duration = duration
        this.setTilePositionList()
    }
    setTilePositionList() {
        this.tilePositionList = this.tileList.map((tileGroup) => {
            return {
                tileGroup,
                currentPosition: tileGroup.group.position.clone()
            }
        })
    }
    async moveTile(index, direction) {
        const tile = this.tilePositionList.find((tilePosition) => tilePosition.tileGroup.index == index)
        // Update currentPosition
        tile.currentPosition.x += (direction == "right") * 3.05 - (direction == "left") * 3.05
        tile.currentPosition.z += (direction == "down") * 3.05 - (direction == "up") * 3.05
        // Update position index    
        tile.tileGroup.positionIndex += (direction == "right") * 1 + (direction == "left") * -1 + (direction == "up") * - 3 + (direction == "down") * 3 
        // Animate
        return new Promise((resolve) => {
            gsap.to(tile.tileGroup.group.position, {
                duration: this.duration,
                x: tile.currentPosition.x,
                z: tile.currentPosition.z,
                onComplete: () => {
                    this.logger.logMove(index, direction)
                    resolve()
                }
            })
        })
    }
    addTileMoveToTimeline(index, direction, label) {
        const tile = this.tilePositionList.find((tilePosition) => tilePosition.tileGroup.index == index)
        // Update currentPosition
        tile.currentPosition.x += (direction == "right") * 3.05 - (direction == "left") * 3.05
        tile.currentPosition.z += (direction == "down") * 3.05 - (direction == "up") * 3.05
        // Update position index
        tile.tileGroup.positionIndex += (direction == "right") * 1 + (direction == "left") * -1 + (direction == "up") * - 3 + (direction == "down") * 3 
        // Animate
        this.tl.to(tile.tileGroup.group.position, {
            duration: this.duration,
            x: tile.currentPosition.x,
            z: tile.currentPosition.z,
            onComplete: () => {
                this.logger.logMove(index, direction)
            }
        }, label)
    }
    createTimeline() {
        this.tl = gsap.timeline({
            delay: this.duration, paused: true,
        })
        return this.tl
    }
    fillTimeline(moveIterator) {
        let move = moveIterator.next()
        while (!move.done) {
            this.addTileMoveToTimeline(move.value.targetIndex, move.value.direction)
            move = moveIterator.next()
        }
    }
    startTimeline() {
        this.tl.play()
    }
    animateTo(duration, goalInstance = null) {
        this.createTimeline()
        // Solve 
        const solver = new Solver(new BoardAdapter(this.tileList, goalInstance))
        solver.aStar()
        const moveIterator = solver.getMoveIterator()
        this.fillTimeline(moveIterator)
        return this.tl
        // this.startTimeline()
    }
    // async moveEmptyTile(direction) {
    //     const board = new BoardAdapter(this.tileList)
    //     const emptyTilePosition = board.emptyTilePosition
    //     switch (direction) {
    //         case "down":
    //             try {
    //                 const tileToMove = board.getTile(emptyTilePosition.row + 1, emptyTilePosition.column)
    //                 await this.moveTile(tileToMove, "up")
    //             } catch {}
    //             break
    //         case "up":
    //             try {
    //                 const tileToMove = board.getTile(emptyTilePosition.row - 1, emptyTilePosition.column)
    //                 await this.moveTile(tileToMove, "down")
    //             } catch {}
    //             break
    //         case "left":
    //             try {
    //                 const tileToMove = board.getTile(emptyTilePosition.row, emptyTilePosition.column - 1)
    //                 await this.moveTile(tileToMove, "right")
    //             } catch {}
    //             break
    //         case "right":
    //             try {
    //                 const tileToMove = board.getTile(emptyTilePosition.row, emptyTilePosition.column + 1)
    //                 await this.moveTile(tileToMove, "left")
    //             } catch {}
    //             break
    //     }
    // }
    async moveEmptyTile(direction) {
        const board = new BoardAdapter(this.tileList)
        const emptyTilePosition = board.emptyTilePosition
        switch (direction) {
            case "down":
                try {
                    const tileToMove = board.getTile(emptyTilePosition.row - 1, emptyTilePosition.column)
                    await this.moveTile(tileToMove, "down")
                } catch { }
                break
            case "up":
                try {
                    const tileToMove = board.getTile(emptyTilePosition.row + 1, emptyTilePosition.column)
                    await this.moveTile(tileToMove, "up")
                } catch { }
                break
            case "left":
                try {
                    const tileToMove = board.getTile(emptyTilePosition.row, emptyTilePosition.column + 1)
                    await this.moveTile(tileToMove, "left")
                } catch { }
                break
            case "right":
                try {
                    const tileToMove = board.getTile(emptyTilePosition.row, emptyTilePosition.column - 1)
                    await this.moveTile(tileToMove, "right")
                } catch { }
                break
        }
    }
}