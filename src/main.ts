import {
    Sprite,
    utils,
    loader,
    Application,
} from "pixi.js"
import One from "./chars/One"
import Charater from "./Character";

//Const definitions
const PLAY = 0

// Web Gl testing
let type = "WebGL"
if(!utils.isWebGLSupported()) {
    type = "canvas"
}
utils.sayHello(`Running on ${type}`)

//Initial setup
let app = new Application({
    width: 800,
    height:600
})

document.body.appendChild(app.view)

// Loading textures to gpu
loader
    .add("oneIdle", "../assets/one/idle.png")
    .load(setup)

//Game Declarations
let player1:Charater;
let state = 0

//Game Setup
function setup() {
    player1 = new One(loader.resources.oneIdle.texture)

    app.stage.addChild(player1.sprite)
    app.ticker.add(delta => loop(delta))
}

function loop(delta:number):void {
    if(state === PLAY) {
        playState(delta)
    }
}
function playState(delta:number):void {
    player1.sprite.x = player1.sprite.x + delta

}