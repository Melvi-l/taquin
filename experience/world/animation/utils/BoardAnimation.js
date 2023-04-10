import * as THREE from "three"
import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";
import Solver from "../../../solver/Solver";
import BoardAdapter from "../../../solver/BoardAdapter";


const DIPLACEMENT = 3.05

export default class BoardAnimation {
    constructor(tileList, scrollTrigger) {
        this.tileList = tileList
        this.scrollTrigger = scrollTrigger
        this.tilePositionList = tileList.map((tileGroup) => {
            return {
                tileGroup,
                currentPosition: tileGroup.group.position.clone()
            }
        })
    }
    moveTile(index, direction, label) {
        const tile = this.tilePositionList.find((tilePosition) => tilePosition.tileGroup.index == index)
        // Update currentPosition
        tile.currentPosition.x += (direction=="right")*3.05 - (direction=="left")*3.05
        tile.currentPosition.z += (direction=="down")*3.05 - (direction=="up")*3.05
        // Animate
        this.tl.to(tile.tileGroup.group.position, {
            duration: .5,
            x: tile.currentPosition.x,
            z: tile.currentPosition.z,
        }, label)
    }
    createTimeline() {
        this.tl = gsap.timeline({paused: true, scrollTrigger: this.scrollTrigger})
        return this.tl
    }
    fillTimeline(moveIterator) {
        let move = moveIterator.next()
        while (!move.done) {
            this.moveTile(move.value.targetIndex, move.value.direction)
            move = moveIterator.next()
        }
    }
    startTimeline() {
        this.tl.play()
    }
    animateTo(goalInstance=null) {
        this.createTimeline()
        // Solve 
        const solver = new Solver(new BoardAdapter(this.tileList, goalInstance))
        solver.aStar()
        const moveIterator = solver.getMoveIterator()
        this.fillTimeline(moveIterator)
        // this.startTimeline()
    }
}