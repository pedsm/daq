import {
    Graphics,
    Point,
    Rectangle,
} from "pixi.js"
import { DEBUG } from "./debug"

export default class HitBox {
    box: Rectangle
    creator: number
    drawable: Graphics
    constructor(coords: Rectangle, creator: number) {
        this.box =  coords
        this.creator =  creator
        this.drawable = new Graphics()
        this.drawable.lineStyle(5, 0xFF0000);
        if (DEBUG) {
            this.drawable.drawRect(
                -coords.width / 2,
                -coords.height / 2,
                coords.width,
                coords.height,
            )
        }
    }
}