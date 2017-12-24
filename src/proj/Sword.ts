import {
    loader,
    Sprite,
} from "pixi.js";
import { Vector } from "../physics";
import Projectile from "../Projectile";
import HitBox from "../HitBox";

export default class Sword implements Projectile {
    sprite: Sprite
    dmg: number
    hp: number
    vel: Vector
    createdAt: number
    hitbox: HitBox
    creator: number
    constructor(x: number, y: number, vel: Vector, creator: number) {
        this.sprite = new Sprite(loader.resources.oneSword.texture)
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.hp = 10
        this.vel = vel
        this.sprite.x = x
        this.sprite.y = y
        this.createdAt = Date.now()
        this.creator = creator
        this.hitbox = new HitBox(this.sprite.getBounds(), creator)
    }

    update(delta: number) {
        const { sprite, vel } = this
        sprite.x += vel.x
        sprite.y += vel.y
        sprite.rotation = (Date.now() - this.createdAt) / 100
    }

    collide() {
       console.log("Collision")
    }

    destroy() {
        this.sprite.destroy()
    }
}