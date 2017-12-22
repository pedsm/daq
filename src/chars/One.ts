import Character, { Stats } from "../Character"
import { Sprite, Texture } from "pixi.js"

export default class One implements Character {
    private sprite: Sprite
    private hp: number
    private stats: Stats
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
        sprite.x += delta * (stats.agi * xStick)
    }

    public collide(dmg: number, obj: Sprite) {
        console.log("Collision with One")
    }
}
