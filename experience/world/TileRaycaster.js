import Experience from "../Experience";
import * as THREE from "three"
import gsap from "gsap"

export default class TileRaycaster {
    constructor() {
        this.experience = new Experience()
        this.taquin = this.experience.world.taquin
        // Setup
        this.setCursorPosition()
        this.setRaycaster()
        this.setDomEventListener()
    }
    // THREE
    setCursorPosition() {
        this.mouse = new THREE.Vector2(-2, -2) // set outside of the usual   value
        const sizes = this.experience.sizes
        window.addEventListener("mousemove", (event) => {
            this.mouse.x = ((event.clientX-sizes.offsetX) / sizes.width - 0.5) * 2
            this.mouse.y = - (((event.clientY-sizes.offsetY) / sizes.height - 0.5) * 2)
        })  
        window.addEventListener("click", () => {
            if (this.currentIntersect) {
            
            }
        })
    }
    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.objectsToTest = this.taquin.tileList.map((tileObject) => tileObject.tile) // listen on tile
        this.duration = 0.5
        this.animations = Array(this.taquin.tileList.length).fill(0).map((_) => { return {tile: null}})
        this.hoverTileNumber = null;
    }
    getIntersect() {
        this.raycaster.setFromCamera(this.mouse, this.experience.camera.instance)
        const intersects = this.raycaster.intersectObjects(this.objectsToTest, false)
        let currentTileNumber = null
        if (intersects.length) {
            currentTileNumber = intersects[0].object.userData.index - 1 
        } 
        return currentTileNumber
    }
    update() {
        const current = this.getIntersect()
        if (current!=null) {
            if (current!=this.hoverTileNumber) {
                for (let index = 0; index < this.taquin.tileList.length; ++index) {
                    if (index == current) {
                        this.elevateTile(index)
                    } else {
                        this.resetTile(index)
                    }
                }
            }
        } else if (this.hoverTileNumber!=null) {
            for (let index = 0; index < this.taquin.tileList.length; ++index) {
                this.resetTile(index)
            }
        }
        this.hoverTileNumber = current
    }
    // DOM
    setDomEventListener() {
        this.navList = Array.from(document.querySelectorAll(".nav-link"))
        this.navList.forEach((el) => {
            el.addEventListener("mouseenter", (ev) => {
                this.elevateTile(el.dataset.index-1)
            })
            el.addEventListener("mouseleave", (ev) => {
                this.resetTile(el.dataset.index-1)
            })
        })
    }
    elevateTile(index) {
        this.navList.find((el) => el.dataset.index == index+1).classList.add("active")
        const animation = this.animations[index].tile
        if (animation) {
            animation.play()
        } else {
            const tile = this.taquin.tileList[index]
            this.animations[index].tile = gsap.to(tile.group.position, {
                duration: this.duration,
                y: tile.default.position.y + 1.5,
                ease: "power2.inOut",
            })
        }
    }
    resetTile(index) {
        this.navList.find((el) => el.dataset.index == index+1).classList.remove("active")
        const animation = this.animations[index].tile
        if (animation) {
            animation.reverse()
        }
    }
    dispose() {
        for (let index = 0; index < this.taquin.tileList.length; ++index) {
            this.resetTile(index)
        }
    }
}