import UIControls from "./UIControls";
import ButtonControls from "./ButtonControls";
import KeyboardControls from "./KeyboardControls";
import SwipeControls from "./SwipeControls";
import ControlsAnimations from "../animation/ControlsAnimations";


export default class Controls {
    constructor() {
        this.animation = new ControlsAnimations()
        this.buttonControls = new ButtonControls(this.animation)
        this.keyboardControls = new KeyboardControls(this.animation)
        this.swipeControls = new SwipeControls(this.animation)
        this.uiControls = new UIControls(this.animation)
        this.setListener()
        this.disabled(true)
    }
    setListener() {
        this.buttonControls.on("abled", () => this.disabled(false))
        this.buttonControls.on("disabled", () => this.disabled(true))
        this.keyboardControls.on("abled", () => this.disabled(false))
        this.keyboardControls.on("disabled", () => this.disabled(true))
        this.swipeControls.on("abled", () => this.disabled(false))
        this.swipeControls.on("disabled", () => this.disabled(true))
        this.uiControls.on("abled", () => this.disabled(false))
        this.uiControls.on("disabled", () => this.disabled(true))
    }
    disabled(bool) {
        this.buttonControls.disabled(bool)
        this.keyboardControls.disabled(bool)
        this.swipeControls.disabled(bool)
        this.uiControls.disabled(bool)
    }
}