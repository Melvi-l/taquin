import * as THREE from "three"

import Experience from "../Experience";

export default class Light {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        // Setup
        this.setMainLight()
        this.setAccentLight()
        this.setAmbientLight()
        this.setDebug()
    }
    setMainLight() {
        this.main = new THREE.SpotLight(0xffffff, 700, 100, Math.PI/6)
        // Transform
        this.main.position.set(-15,15,-15)
        this.main.lookAt(0,0,0)
        // Shadow
        this.main.castShadow = true
        this.main.shadow.mapSize.set(1024, 1024)
        this.main.shadow.camera.fov = 60
        this.main.shadow.camera.near = 5
        this.main.shadow.camera.far = 50
        this.main.shadow.normalBias = 0.05
        // Helper
        this.mainHelper = new THREE.CameraHelper(this.main.shadow.camera)
        this.mainHelper.visible = false
        // Add to scene
        this.scene.add(this.main, this.mainHelper)
    }
    setAccentLight() {
        this.accent = new THREE.SpotLight(0xDD2E29, 20, 100, Math.PI/6) // TODO: think about switching with a directionnal
        // Transform
        this.accent.position.set(10,10,9)
        this.accent.lookAt(0,0,0)
        // Shadow
        this.accent.castShadow = true
        this.accent.shadow.mapSize.set(1024, 1024)
        this.accent.shadow.camera.fov = 80
        this.accent.shadow.camera.near = 5
        this.accent.shadow.camera.far = 50
        this.accent.shadow.normalBias = 0.05
        // Helper
        this.accentHelper = new THREE.CameraHelper(this.accent.shadow.camera)
        this.accentHelper.visible = false
        // Add to scene
        this.scene.add(this.accent, this.accentHelper)
    }
    setAmbientLight() {
        this.ambient = new THREE.AmbientLight(0xffffff, 0.1)
        this.scene.add(this.ambient)
    }
    setDebug() {
        if (this.debug.active) {
            const debugFolder = this.debug.ui.addFolder("Light").close()
            // Main tweak
            debugFolder.addColor(this.main, "color").name("Main color")
            debugFolder.add(this.main, "intensity")
                .min(0)
                .max(10000)
                .step(0.001)
                .name("Main intensity")
            debugFolder.add(this.mainHelper, "visible").name("Mainhelper visibility")
            // Accent tweak
            debugFolder.addColor(this.accent, "color").name("Accent color")
            debugFolder.add(this.accent, "intensity")
                .min(0)
                .max(200)
                .step(0.001)
                .name("Accent intensity")
            debugFolder.add(this.accentHelper, "visible").name("Accenthelper visibility")
            debugFolder.addColor(this.ambient, "color").name("Ambient color")
            debugFolder.add(this.ambient, "intensity")
                .min(0)
                .max(1)
                .step(0.001)
                .name("Ambient intensity")
        }
    }
}