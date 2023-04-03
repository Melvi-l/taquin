import TileGroup from "../world/taquin/TileGroup.js"
import Board from "./Board.js"

export default class BoardAdapter extends Board{
    constructor(tileList, goalInstance) {
        const instance = Array(3).fill(0).map((_) => Array(3).fill(0))
        for (let tileGroup of tileList) {
            const tilePosition = tileGroup.group.position
            let row = null
            let column = null
            switch (tilePosition.x) {
                case -3.05:
                    column = 0
                    break
                case 0:
                    column = 1
                    break
                case 3.05:
                    column = 2
                    break
            }
            switch (tilePosition.z) {
                case -3.05:
                    row = 0
                    break
                case 0:
                    row = 1
                    break
                case 3.05:
                    row = 2
                    break
            }
            if (row!=null&&column!=null) {
                instance[row][column] = tileGroup.index
            } else {
                throw new Error("wrong tile position")
            }
        }
        super(instance, goalInstance, null, 0, null, null)
    }
}