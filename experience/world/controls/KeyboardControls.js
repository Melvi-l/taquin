import EventEmitter from "../../utils/EventEmitter";

export default class KeyboardControls extends EventEmitter {
    constructor(controlAnimation) {
        super()
        this.abled = true
        this.animations = controlAnimation
        // Setup
        this.setListener()
    }
    setListener() {
        window.addEventListener("keydown", (ev) => this.keyDownHandler(ev.code))
    }
    async keyDownHandler(code) {
        if (this.abled) {
            this.trigger("disabled")
            // this.abled = false // no need to trigger on button, locally disabled
            switch (code) {
                case "ArrowDown":
                    await this.animations.moveEmptyTile("down")
                    break
                case "ArrowUp":
                    await this.animations.moveEmptyTile("up")
                    break
                case "ArrowLeft":
                    await this.animations.moveEmptyTile("left")
                    break
                case "ArrowRight":
                    await this.animations.moveEmptyTile("right")
                    break
                case "KeyS":
                    await this.animations.solve()
                    break
                case "KeyR":
                    await this.animations.randomize()
                    break
            }
            // this.abled = true
            this.trigger("abled")
        }
    }
    disabled(bool) {
        this.abled = !bool
    }
}