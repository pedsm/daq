import { Sprite, Texture } from "pixi.js"
import Character, { Stats } from "../Character"

export default class One implements Character {
    sprite: Sprite
    hp: number
    stats: Stats
    constructor(look: Texture) {
        this.stats = {
            agi: 5,
            def: 5,
            str: 5,
        }
        this.hp = 100
        this.sprite = new Sprite(look)
    }

    public move(delta: number, xStick: number, yStick: number) {
        const {sprite, stats} = this
        if (Math.abs(xStick) > 0.3) {
            sprite.x += delta * (stats.agi * xStick)
        }
    }

    public collide(dmg: number, obj: Sprite) {
        console.log("Collision with One")
    }
}
