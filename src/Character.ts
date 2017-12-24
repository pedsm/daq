import { Sprite, Texture } from "pixi.js"
import Projectile from "./Projectile";

export default interface Charater {
    sprite: Sprite,
    hp: number,
    stats: Stats,
    index: number,
    move(delta: number, xStick: number, yStick: number): void,
    collide(dmg: number, obj: Sprite): void,
    jump(): void
    basicAttack(xStick: number, yStick: number): Projectile | Projectile[] | null
}

export interface Stats {
    str: number
    agi: number
    def: number
}