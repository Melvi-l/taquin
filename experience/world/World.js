import * as THREE from "three"
import { AmbientLight } from "three"

import Experience from "../Experience"
import Animations from "./animation/Animations"
import ButtonControls from "./controls/ButtonControls"
import Controls from "./controls/Controls"
import Light from "./Light"
import Taquin from "./taquin/Taquin"
import TileRaycaster from "./TileRaycaster"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
    }
    load() {
        this.taquin = new Taquin()
        this.light = new Light()
        this.animations = new Animations()
        this.controls = new Controls()
        this.raycaster = null
    } 
    update() {
        if (this.raycaster) {
            this.raycaster.update()
        }
    }
}