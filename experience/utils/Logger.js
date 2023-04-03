import Move from "../solver/Move"

export default class Logger {
    constructor() {
        this.console = document.querySelector(".console-wrapper .zone")
    }
    logMove(targetIndex, direction) {
        this.log("move", `${targetIndex} "${direction}"`)
    }
    logSucces() {
        this.log("success", `Congratulation !`)
    }
    logRandomize() {
        this.log("randomize", `Randomize...`)
    }
    logSolve() {
        this.log("solve", `Solve...`)
    }
    log(type, detail) {
        console.log(this.console.scrollHeight,this.console.clientHeight)
        if (this.console.scrollHeight > this.console.clientHeight || this.console.scrollWidth > this.console.clientWidth) {
        }
        while (this.console.children.length>15) {
            this.console.removeChild(this.console.firstChild)
        }
        this.console.innerHTML += this.getLogComponent(type, detail)
    }
    getLogComponent(type, detail) {
        return `
        <div class="el ${type}">
            <div class="time">${new Date().toLocaleTimeString()}</div>
            <div class="type">[${type.toUpperCase()}] -</div>
            <div class="detail">${detail}</div>
        </div>
        `
    }
}