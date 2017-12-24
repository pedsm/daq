import { Sprite, Texture } from "pixi.js"
import HitBox from "./HitBox";
import Projectile from "./Projectile";

export default interface Charater {
    sprite: Sprite,
    hp: number,
    stats: Stats,
    index: number,
    hitbox: HitBox,
    move(delta: number, xStick: number, yStick: number): void,
    collide(dmg: number): void,
    jump(): void
    basicAttack(xStick: number, yStick: number): Projectile | Projectile[] | null
}

export interface Stats {
    str: number
    agi: number
    def: number
}