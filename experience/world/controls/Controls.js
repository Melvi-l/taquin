import EventEmitter from "../../utils/EventEmitter";
import ButtonControls from "./ButtonControls";
import KeyboardControls from "./KeyboardControls";
import SwipeControls from "./SwipeControls";

export default class Controls {
    constructor() {
        this.buttonControls = new ButtonControls()
        this.keyboardControls = new KeyboardControls()
        this.swipeControls = new SwipeControls()
        this.setListener()
    }
    setListener() {
        this.buttonControls.on("abled", () => this.disabled(false))
        this.buttonControls.on("disabled", () => this.disabled(true))
        this.keyboardControls.on("abled", () => this.disabled(false))
        this.keyboardControls.on("disabled", () => this.disabled(true))
        this.swipeControls.on("abled", () => this.disabled(false))
        this.swipeControls.on("disabled", () => this.disabled(true))
    }
    disabled(bool) {
        this.buttonControls.disabled(bool)
        this.keyboardControls.disabled(bool)
        this.swipeControls.disabled(bool)
    }
}