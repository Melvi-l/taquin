import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor(canvas) {
        super()
        this.canvas = canvas
        // Setup
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        const boundingBox = this.canvas.getBoundingClientRect()
        this.offsetX = boundingBox.x
        this.offsetY = boundingBox.y
        this.pixelRation = Math.min(window.devicePixelRatio, 2)
        
        // Resize
        onresize = () => {
            this.update()
        }
    }
    
    update() {
        // Update sizes
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        const boundingBox = this.canvas.getBoundingClientRect()
        this.offsetX = boundingBox.x
        this.offsetY = boundingBox.y
        this.pixelRation = Math.min(window.devicePixelRatio, 2)
        this.trigger('resize')
    }    
}

// 