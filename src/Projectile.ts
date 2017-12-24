import { Sprite } from "pixi.js";
import HitBox from "./HitBox"
import { Vector } from "./physics"

export default interface Projectile {
    sprite: Sprite | null,
    dmg: number,
    hp: number,
    vel: Vector,
    hitbox: HitBox,
    update(delta: number): void,
    collide(): void,
    destroy(): void,
}
