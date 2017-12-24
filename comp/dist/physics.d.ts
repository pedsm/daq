import { Rectangle } from "pixi.js";
export declare const GRAV = 3;
export declare const TERMINAL = 30;
export declare const FLOOR = 500;
export declare class Vector {
    x: number;
    y: number;
    angle: number;
    constructor(x: number, y: number, vel: number);
    magnitude(): number;
}
export declare function collisionTest(one: Rectangle, two: Rectangle): boolean;
