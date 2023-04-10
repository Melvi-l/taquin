import { Raycaster } from "three";
import Experience from "../../Experience";
import EventEmitter from "../../utils/EventEmitter";
import ControlsAnimations from "../animation/ControlsAnimations";
import TileRaycaster from "../TileRaycaster";

export default class UIControls extends EventEmitter {
    constructor() {
        super()
        this.experience = new Experience()
        // Setup
        this.isMenuOpen = false
        this.console = document.querySelector(".console-wrapper")
        this.consoleButton = document.querySelector(".console")
        this.menu = document.querySelector(".menu-wrapper")
        this.menuButton = document.querySelector(".menu")
        this.setListener()
    }
    setListener() {
        this.consoleButton.addEventListener("click", () => this.openConsole())
        this.menuButton.addEventListener("click", () => this.openMenu())
        window.addEventListener("keydown", (ev) => {
            switch (ev.key) {
                case "C":
                case "c":
                    this.openConsole()
                    break;
                case "M":
                case "m":
                    this.openMenu()
                    break;
            }
        })
        document.querySelector(".help-button")
            .addEventListener("mouseenter", () => document.querySelector(".commands").classList.add("active"))
        document.querySelector(".help-button")
            .addEventListener("mouseleave", () => document.querySelector(".commands").classList.remove("active"))
    }
    async randomize() {
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
        if (this.isMenuOpen) {
            this.menu.classList.remove("active")
            this.experience.world.raycaster.dispose()
            this.experience.world.raycaster = null
            this.isMenuOpen = false
        }
        this.console.classList.toggle("active")
        window.setTimeout(() => {
            this.experience.sizes.update()
        }, 500)
    }
    openMenu() {
        if (this.isMenuOpen) {
            this.menu.classList.remove("active")
            this.experience.world.raycaster.dispose()
            this.experience.world.raycaster = null
            this.experience.canvas.classList.remove("menu")
            window.setTimeout(() => {
                this.experience.sizes.update()
            }, 500)
        } else {
            this.menu.classList.add("active")
            this.experience.world.raycaster = new TileRaycaster()
            window.setTimeout(() => {
                this.experience.canvas.classList.add("menu")
                this.experience.sizes.update()
            }, 500)
        }
        this.isMenuOpen = !this.isMenuOpen
        this.console.classList.remove("active")
    }
    disabled(bool) {
        this.randomizeButton.disabled = bool
        this.solveButton.disabled = bool
    }
}