import Character, { Stats } from "../Character"
import { Sprite, Texture } from "pixi.js"

export default class One implements Character {
    sprite:Sprite
    hp:Number
    stats:Stats
    constructor(look:Texture) {
        this.stats = {
            str: 5,
            agi: 5,
            def: 5
        }
        this.hp = 100
        this.sprite = new Sprite(
            look
        )
    }

    move(xStick:Number, yStick:Number) {

    }

    collide(dmg:Number, obj:Sprite) {

    }

}