import { Sprite, Texture } from "pixi.js";
import Character, { Stats } from "../Character";
import Projectile from "../Projectile";
export default class One implements Character {
    sprite: Sprite;
    hp: number;
    stats: Stats;
    velY: number;
    constructor(look: Texture);
    move(delta: number, xStick: number, yStick: number): void;
    basicAttack(xStick: number, yStick: number): Projectile;
    jump(): void;
    collide(dmg: number, obj: Sprite): void;
}
