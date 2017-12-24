import {
    Graphics,
    Rectangle,
} from "pixi.js";

export default class HitBox {
    box: Rectangle
    creator: number
    drawable: Graphics
    constructor(coords: Rectangle, creator: number) {
        this.box =  coords
        this.creator =  creator
        this.drawable = new Graphics()
        this.drawable.lineStyle(5, 0xFF0000);
        this.drawable.drawRect(coords.x, coords.y, coords.width, coords.height)
    }
    update(coords: Rectangle) {
        this.drawable.x = coords.x
        this.drawable.y = coords.y
        this.drawable.width = coords.width
        this.drawable.height = coords.height
    }
}