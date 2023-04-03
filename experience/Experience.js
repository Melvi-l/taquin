import * as THREE from "three"

import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer";
import World from "./world/World";
import Resources from "./utils/Resources";
import sources from "./sources";
import GUI from "./utils/Debug";
import Logger from "./utils/Logger";

let instance = null;

export default class Experience {
    constructor(canvas) {
        //  Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        /**
         * Setup
         */ 

        // Utils
        this.debug = new GUI()
        this.logger = new Logger()
        this.sizes = new Sizes(this.canvas)
        this.time = new Time()
        this.resources = new Resources(sources)

        // General
        this.scene = new THREE.Scene()
        this.scene.background = null
        this.camera = new Camera() 
        this.renderer = new Renderer()

        // World 
        this.world = new World()

        // Event
        this.sizes.on('resize', () => {this.resize()})
        this.time.on('tick', () => {this.update()})
        this.resources.on('ready', () => {this.load()})
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }

    load() {
        this.world.load()
    }
}