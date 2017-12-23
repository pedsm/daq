import { Sprite } from "pixi.js";

export const GRAV = 5
export const TERMINAL = 30
export const FLOOR = 500

export class Vector {
    x: number
    y: number
    angle: number
    cosntructor(x: number, y: number, vel: number) {
        const { sin, cos } = Math
        this.angle = Math.atan2(this.y, this.x)
        this.x = vel * cos(this.angle)
        this.y = vel * sin(this.angle)
    }

    magnitude(): number {
        const { sqrt, pow } = Math
        return sqrt(pow(this.x, 2) + pow(this.y, 2))
    }
}