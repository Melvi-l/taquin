import EventEmitter from "../../utils/EventEmitter";

export default class SwipeControls extends EventEmitter {
    constructor(controlAnimation) {
        super()
        this.abled = true
        this.animations = controlAnimation
        // Setup
        this.setListener()
    }

    setListener() {
        this.setMouseListener()
        this.setTouchListener()
    }
    setMouseListener() {
        document.addEventListener("mousedown", (ev) => this.down(ev.clientX, ev.clientY))
        document.addEventListener("mouseup", (ev) => this.up(ev.clientX, ev.clientY))
    }
    down(startX, startY) {
        this.startX = startX
        this.startY = startY
    }
    async up(endX, endY) {
        const SENSIBILITY = 5
        const deltaX = endX - this.startX
        const deltaY = endY - this.startY
        if (this.abled && Math.abs(deltaX) > SENSIBILITY && Math.abs(deltaY) > SENSIBILITY) {
            this.trigger("disabled")
            if (Math.abs(deltaX) >= Math.abs(deltaY)) {
                if (deltaX >= 0) {
                    await this.animations.moveEmptyTile("right")
                } else {
                    await this.animations.moveEmptyTile("left")
                }
            } else {
                if (deltaY >= 0) {
                    await this.animations.moveEmptyTile("down")
                } else {
                    await this.animations.moveEmptyTile("up")
                }
            }
            this.trigger("abled")
        }
    }
    setTouchListener() {
        document.addEventListener("touchstart", (ev) => this.down(ev.touches[0].clientX, ev.touches[0].clientY))
        document.addEventListener("touchmove", (ev) => this.animations.moveEmptyTile(this.up(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY)))
    }
    disabled(bool) {
        this.abled = !bool
    }
}