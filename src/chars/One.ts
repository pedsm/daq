import { Sprite, Texture, loader } from "pixi.js"
import Character, { Stats } from "../Character"
import {
    FLOOR,
    GRAV,
    TERMINAL,
} from "../physics"

export default class One implements Character {
    sprite: Sprite
    hp: number
    stats: Stats
    velY: number
    constructor(look: Texture) {
        this.stats = {
            agi: 10,
            def: 10,
            str: 10,
        }
        this.hp = 100
        this.sprite = new Sprite(loader.resources.oneIdle.texture)
        this.velY = 0
    }

    public move(delta: number, xStick: number, yStick: number) {
        const { sprite, stats } = this
        if (Math.abs(xStick) > 0.3) {
            //Update Sprite
            this.sprite.texture = Date.now() % 20 >= 10
            ? loader.resources.oneWalk1.texture
            : loader.resources.oneWalk2.texture
            sprite.x += delta * (stats.agi * xStick)
            this.sprite.scale.x = xStick < 0 ? -1 : 1
        } else {
            this.sprite.texture = loader.resources.oneIdle.texture
        }


        // Accelerate but keep max vel
        if (this.velY < TERMINAL) {
            this.velY = this.velY + GRAV
        } else {
            this.velY = TERMINAL
        }
        // Move without passing the floor
        sprite.y += this.velY
        if (sprite.y > FLOOR) {
            sprite.y = FLOOR
        }
    }

    public jump() {
        const { sprite } = this
        if (sprite.y === FLOOR) {
            this.velY = -40
        }
    }

    public collide(dmg: number, obj: Sprite) {
        console.log("Collision with One")
    }
}
