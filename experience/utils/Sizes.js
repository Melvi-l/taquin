import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor(canvas) {
        super()
        this.canvas = canvas
        // Setup
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
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
        this.pixelRation = Math.min(window.devicePixelRatio, 2)
        this.trigger('resize')
    }    
}

// 