import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience";

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.hasOrbitControl = false
        this.setOrbitControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            25,
            this.sizes.width/this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(0,40,0)
        this.scene.add(this.instance)
        // Instance
        this.instance = new THREE.PerspectiveCamera(
            25,
            this.sizes.width/this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(0, 40, 0)
        this.instance.lookAt(0,0,0)
        // Group
        this.group = new THREE.Group()
        this.group.position.set(0,0,0)
        // Add to scene
        this.group.add(this.instance) // instance to group
        this.scene.add(this.group) // group to scene    

    }

    setOrbitControls() {
        if (this.hasOrbitControl) {
            this.controls = new OrbitControls(this.instance, this.canvas)
            this.controls.enableDamping = true 
        }
    }

    resize() {
        console.log(this.sizes)
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        if (this.hasOrbitControl) {
            this.controls.update()
        }
    }
}