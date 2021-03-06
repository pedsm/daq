import {
    Graphics,
    Point,
    Rectangle,
} from "pixi.js"
import { DEBUG } from "./debug"

export default class HitBox {
    box: Rectangle
    index: number
    drawable: Graphics
    constructor(coords: Rectangle, creator: number) {
        this.box =  coords
        this.index =  creator
        this.drawable = new Graphics()
        this.drawable.lineStyle(1, colorList[creator]);
        if (DEBUG) {
            this.drawable.drawRect(
                -coords.width / 2,
                -coords.height / 2,
                coords.width,
                coords.height,
            )
        }
    }
    getBounds(): Rectangle {
        return this.drawable.getBounds()
    }
}

const colorList = [
    0xFF0000,
    0x00FF00,
    0x0000FF,
    0xFF00FF,
]