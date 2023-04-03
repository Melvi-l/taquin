import * as THREE from "three"
import gsap from "gsap"

import Experience from "../../Experience"
import Board from "../../solver/Board"
import BoardAnimations from "./BoardAnimations"
import BoardAdapter from "../../solver/BoardAdapter"
import Logger from "../../utils/Logger"

export default class ControlsAnimations {
    constructor(duration = .3) {
        this.experience = new Experience()
        this.logger = this.experience.logger
        this.taquin = this.experience.world.taquin
        this.duration = duration
    }
    async randomize() {
        const DURATION = 1
        const customRotation = {
            rot: 0
        }
        return new Promise((resolve) => {
            gsap.to(customRotation, {
                duration: 1,
                rot: Math.PI*2,
                onUpdate: () => {
                    this.taquin.group.setRotationFromAxisAngle(new THREE.Vector3(.4, 0, -1).normalize(), customRotation.rot)
                },
                onComplete: () => resolve()
            })
            gsap.delayedCall(DURATION/2, () => {
                console.log(this.taquin)
                this.taquin.placeTile(Board.getRandomArray())
            })
            this.logger.logRandomize()
        })
        
    }
    async solve() {
        this.logger.logSolve()
        console.log(this.duration)
        const tl = new BoardAnimations(this.taquin.tileList, this.duration).animateTo()
        return new Promise((resolve) => {
            tl.eventCallback("onComplete", () => {
                this.logger.logSucces()
                resolve()
            })
            tl.play()
        })
    }
    async moveEmptyTile(direction) {
        await new BoardAnimations(this.taquin.tileList, this.duration).moveEmptyTile(direction)
    }
}
