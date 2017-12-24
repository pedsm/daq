import { Sprite } from "pixi.js";

export const GRAV = 3
export const TERMINAL = 30
export const FLOOR = 500

export class Vector {
    x: number
    y: number
    angle: number
    constructor(x: number, y: number, vel: number) {
        this.angle = Math.atan2(y, x)
        this.x = vel * Math.cos(this.angle)
        this.y = vel * Math.sin(this.angle)
    }

    magnitude(): number {
        const { sqrt, pow } = Math
        return sqrt(pow(this.x, 2) + pow(this.y, 2))
    }
}