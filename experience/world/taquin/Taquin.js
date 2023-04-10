import * as THREE from "three"
import Experience from "../../Experience";
import TileGroup from "./TileGroup";

export default class Taquin {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.group = new THREE.Group()
        this.experience.scene.add(this.group)
        
        this.setBase()
        this.setTileList()
        this.placeTileElevation()
    }
    isSuccess() {
        console.log(this.tileList.every((tileGroup) => tileGroup.index == tileGroup.positionIndex))
        return this.tileList.every((tileGroup) => tileGroup.index == tileGroup.positionIndex)
    }
    setBase() {
        this.base = this.resources.items.base.scene.children[0]
        this.base.material.normalScale.setScalar(3)
        this.base.receiveShadow = true
        this.group.add(this.base)
    }
    setTileList() {
        const birch = this.resources.items.birchTile.scene.children[0]
        const red = this.resources.items.redTile.scene.children[0]
        const font = this.resources.items.font
        this.tileList = Array(8).fill(0).map((_, index) => {
            if (index%2==1) {
                return new TileGroup(birch, font, index+1)
            } else {
                return new TileGroup(red, font, index+1)
            }
        })
        this.group.add(...this.tileList.map((tileGroup) => tileGroup.group))
    }
    placeTileElevation() {
        this.tileList.forEach((tileGroup) => {
            // Top of the base
            const topOfBase = 0.2

            // Base of the tile
            const baseOfTile = new THREE.Box3().setFromObject(tileGroup.group).min.y

            tileGroup.group.position.y += -baseOfTile + 0.2
            tileGroup.setDefaultParameters()
        })
    }
    placeTile(configuration) {
        // configuration de la forme [1,2,6,7,4,5,3,8,0]
        configuration.forEach((value, index) => {
            if (value != 0) {
                const tile = this.tileList.find((tileGroup) => tileGroup.index == value)
                tile.placeTile(index+1)
            }
        })
    }
}