export declare const GRAV = 5;
export declare const TERMINAL = 30;
export declare const FLOOR = 500;
export declare class Vector {
    x: number;
    y: number;
    angle: number;
    cosntructor(x: number, y: number, vel: number): void;
    magnitude(): number;
}
