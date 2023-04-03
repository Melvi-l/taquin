import * as THREE from "three"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class TileGroup {
    constructor(tileObject, font, index,) {

        // Setup
        this.index = index
        this.group = new THREE.Group()
        this.setTile(tileObject)
        this.setNumber(font)
        this.placeTile(index)
    }

    setTile(tileObject) {
        this.tile = tileObject.clone()

        // Shadow
        this.tile.castShadow = true
        this.tile.receiveShadow = true

        // Normal
        this.tile.material.normalScale.setScalar(4)
        this.group.add(this.tile)
    }

    setNumber(font) {
        const geometry = new TextGeometry(`${this.index}`, {
            font: font,
            size: 1,
            height: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 3
        })
        geometry.rotateX(-Math.PI / 2)
        const material = new THREE.MeshStandardMaterial({
            color: 0x101010
        })
        material.roughness = 0.5
        material.metalness = 0.5
        this.number = new THREE.Mesh(geometry, material)

        // Shadow
        this.number.castShadow = true
        this.number.receiveShadow = true

        // Get the centering translation on x and z
        const boundingBoxCenter = new THREE.Vector3()
        this.number.geometry.computeBoundingBox()
        this.number.geometry.boundingBox.getCenter(boundingBoxCenter)

        // Get the y maximum of the tile
        this.tile.geometry.computeBoundingBox()
        const topOfTile = this.tile.geometry.boundingBox.max.y

        this.number.position.set(
            -boundingBoxCenter.x,
            topOfTile,
            -boundingBoxCenter.z,
        )

        this.group.add(this.number)
    }

    placeTile(index) {
        this.group.position.x =
            3.05 * ((index - 1) % 3 - 1)

        this.group.position.z =
            3.05 * (Math.floor((index - 1) / 3) - 1)
    }
    getPosition(index) {
        return new THREE.Vector3(
            3.05 * ((index - 1) % 3 - 1),
            this.default.position.y,
            3.05 * (Math.floor((index -1) / 3) - 1)
        )
    }

    setDefaultParameters() {
        this.default = {}
        this.default.position = new THREE.Vector3().copy(this.group.position)
        this.default.rotation = new THREE.Vector3().copy(this.group.rotation)
    }
}