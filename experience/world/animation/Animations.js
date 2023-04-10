import * as THREE from "three"
import gsap from "gsap"

import Experience from "../../Experience"
import Board from "../../solver/Board"
import BoardAnimations from "./BoardAnimations"

export default class Animations {
    constructor() {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.taquin = this.experience.world.taquin
        // Setup
        this.tl = gsap.timeline({delay: 1})
        this.init()
    }
    init() {
        let DURATION = 1
        // Tilt
        let BREAK = 1
        this.tl.to(this.camera.instance.position, {
            duration: DURATION,
            x: 0,
            y: 30,
            z: 0,
            ease: "power2.inOut",
        }, "init")
        this.tl.to(this.camera.group.rotation, {
            duration: DURATION,
            x: Math.PI/3,
            y: 0,
            z: 0,
            ease: "power2.inOut",
        }, "init")
        this.addBeak(0)
        // Split
        this.tl.to(this.camera.instance.position, {
            duration: 1,
            y: 45,
            ease: "linear"
        }, "split")
        console.log(this.taquin.base)
        this.tl.to(this.taquin.base.position, {
            duration: .7,  
            y: - 7,
            ease: "power1.inOut"
        }, "split+=.3")
        this.taquin.tileList.forEach((tile, index) => {
            this.tl.to(tile.group.position, {
                duration: .5,  
                delay: Math.floor(index/3)*0.1,
                y: tile.default.position.y + 7,
                ease: "power1.inOut"
            }, "split+=.3")
        })
        this.tl.to(".demo", {
            duration: .4,
            opacity: 1,
            ease: "power1.in"
        }, "split+=.6")
        this.addBeak(BREAK)
        // Reverse split
        this.taquin.tileList.forEach((tile, index) => {
            this.tl.to(tile.group.position, {
                duration: .5,  
                delay: .3-Math.floor(index/3)*0.1,
                y: tile.default.position.y,
                ease: "power1.inOut"
            }, "unsplit")
        })
        this.tl.to(".demo", {
            duration: .4,
            opacity: 0,
            ease: "power1.out"
        }, "unsplit")
        this.tl.to(this.taquin.base.position, {
            duration: .7,  
            y: 0,
            ease: "power1.inOut"
        }, "unsplit")
        this.tl.to(this.camera.instance.position, {
            duration: 1,
            y: 30,
            ease: "linear"
        }, "unsplit+=.3")
        // Set Up
        this.tl.to(this.camera.instance.position, {
            duration: DURATION,
            y: 60,
            z: 2,
            ease: "linear"
        }, "setup")
        this.tl.to(this.camera.group.rotation, {
            duration: DURATION,
            x: Math.PI/8,
            y: Math.PI/16,
            ease: "power2.inOut",
            onComplete: () => this.setUpUI()
        }, "setup")
    }
    addBeak(duration) {
        this.tl.addPause(null, () => {
            console.log("end break")
            gsap.delayedCall(duration, () => this.tl.play())
        })
    }
    setUpUI() {
        document.querySelector(".controls").classList.add("active")
        document.querySelector("header").classList.add("visible")
        document.querySelector(".main-wrapper").classList.add("visible")
    }
}