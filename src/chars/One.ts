import {
    loader,
    Sprite,
    Texture,
} from "pixi.js"
import Character, { Stats } from "../Character"
import HitBox from "../HitBox";
import {
    FLOOR,
    GRAV,
    TERMINAL,
    Vector,
} from "../physics"
import Sword from "../proj/Sword"
import Projectile from "../Projectile";

export default class One implements Character {
    sprite: Sprite
    hp: number
    stats: Stats
    velY: number
    lastShot: number
    direction: number
    hitbox: HitBox
    index: number
    constructor(look: Texture, index: number) {
        this.stats = {
            agi: 10,
            def: 10,
            str: 10,
        }
        this.hp = 100
        this.index = index
        this.sprite = new Sprite(loader.resources.oneIdle.texture)
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.velY = 0
        this.direction = 1
        this.lastShot = 0
        this.hitbox = new HitBox(this.sprite.getBounds(), this.index)
        this.sprite.addChild(this.hitbox.drawable)
    }

    public move(delta: number, xStick: number, yStick: number) {
        const { sprite, stats } = this
        // Jump if stick is up
        if (yStick < -0.9) {
            this.jump()
        }
        if (Math.abs(xStick) > 0.3) {
            // Update Sprite
            this.sprite.texture = Date.now() % 20 >= 10
            ? loader.resources.oneWalk1.texture
            : loader.resources.oneWalk2.texture
            // Move x
            sprite.x += delta * (stats.agi * xStick)
            // Flip when needed
            this.direction = xStick < 0 ? -1 : 1
            this.sprite.scale.x = this.direction
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

    public basicAttack(xStick: number, yStick: number): Projectile | null {
        if (Date.now() - this.lastShot < 500) {
            return null
        }
        const shotSpeed = 10
        this.lastShot = Date.now()
        let velocity = new Vector(xStick, yStick, shotSpeed)
        const { abs } = Math
        if (abs(xStick) + abs(yStick) < 0.5) {
            console.log("corrected")
            velocity = new Vector(this.direction, 0, shotSpeed)
        }
        const proj = new Sword(
            this.sprite.x,
            this.sprite.y,
            velocity,
            this.index,
        )
        return proj
    }

    public jump() {
        const { sprite } = this
        if (sprite.y === FLOOR) {
            this.velY = -40
        }
    }

    public collide(dmg: number) {
        this.hp -= dmg
        console.log(`Hit did ${dmg} new hp = ${this.hp}`)
    }
}
