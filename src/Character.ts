import { Sprite } from "pixi.js"

export default interface Charater {
    sprite: Sprite,
    hp: number,
    stats: Stats,
    move(delta: number, xStick: number, yStick: number): void,
    collide(dmg: number, obj: Sprite): void,
}

export interface Stats {
    str: number
    agi: number
    def: number
}