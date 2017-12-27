import {
    Rectangle,
    Sprite,
} from "pixi.js";

export const GRAV = 3
export const TERMINAL = 30
export const FLOOR = 600

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

export function collisionTest(one: Rectangle, two: Rectangle): boolean {
    return one.x + (one.width / 2) > two.x - (two.width / 2) &&
    one.x - (one.width / 2) < two.x + (two.width / 2) &&
    one.y + (one.height / 2) > two.y - (two.height / 2) &&
    one.y - (one.height / 2) < two.y + (two.height / 2);
}