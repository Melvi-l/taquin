import Experience from "../../Experience";
import EventEmitter from "../../utils/EventEmitter";
import ControlsAnimations from "../animation/ControlsAnimations";

export default class ButtonControls extends EventEmitter {
    constructor() {
        super()
        this.animations = new ControlsAnimations()
        // Setup
        this.randomizeButton = document.querySelector(".button.randomize")
        this.solveButton = document.querySelector(".button.solve")
        console.log(this.randomizeButton)
        this.setListener()
    }
    setListener() {
        this.randomizeButton.addEventListener("click", () => this.randomize())
        this.solveButton.addEventListener("click", () => this.solve())
    }
    async randomize() {
        console.log("random")
        this.trigger("disabled")
        await this.animations.randomize()
        this.trigger("abled")
    }
    async solve() {
        this.trigger("disabled")
        await this.animations.solve()
        this.trigger("abled")
    }
    openConsole() {
        
    }
    disabled(bool) {
        this.randomizeButton.disabled = bool
        this.solveButton.disabled = bool
    }
}