import { Sprite } from "pixi.js";
import Projectile from "./Projectile";
export default interface Charater {
    sprite: Sprite;
    hp: number;
    stats: Stats;
    move(delta: number, xStick: number, yStick: number): void;
    collide(dmg: number, obj: Sprite): void;
    jump(): void;
    basicAttack(xStick: number, yStick: number): Projectile | null;
}
export interface Stats {
    str: number;
    agi: number;
    def: number;
}
