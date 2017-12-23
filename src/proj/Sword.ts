import {
    loader,
    Sprite,
} from "pixi.js";
import { Vector } from "../physics";
import Projectile from "../Projectile";

export default class Sword implements Projectile {
    sprite: Sprite
    dmg: number
    hp: number
    vel: Vector
    constructor(x: number, y: number, vel: Vector) {
        this.sprite = new Sprite(loader.resources.oneSwort.texture)
        this.hp = 10
        this.vel = vel
        this.sprite.x = x
        this.sprite.y = y

    }
    update(delta) {
        this.sprite.x += this.vel.x
        this.sprite.y -= this.vel.y
    }
    collide() {
       console.log("Collision")
    }
    destroy() {
        this.sprite.destroy()
    }
}