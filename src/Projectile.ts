import { Sprite } from "pixi.js";
import { Vector } from "./physics"

export default interface Projectile {
    sprite: Sprite,
    dmg: number
    hp: number,
    vel: Vector,
    update(delta),
    collide(),
    destroy(),
}
