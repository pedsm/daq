import { Sprite } from "pixi.js"

export default interface Charater{
    sprite:Sprite,
    hp:Number,
    stats:Stats,
    move(xStick:Number, yStick:Number):void,
    collide(dmg:Number, obj:Sprite):void,
}

export interface Stats {
    str: Number
    agi: Number
    def: Number
}