import {
    Application,
    loader,
    Sprite,
    utils,
} from "pixi.js"
import Charater from "./Character";
import One from "./chars/One"

// Const definitions
const PLAY = 0

// Web Gl testing
let type = "WebGL"
if (!utils.isWebGLSupported()) {
    type = "canvas"
}
utils.sayHello(`Running on ${type}`)

// Initial setup
const app = new Application({
    height: 600,
    width: 800,
})

document.body.appendChild(app.view)

// Loading textures to gpu
loader
    .add("oneIdle", "../assets/one/idle.png")
    .load(setup)

// Game Declarations
const players: Charater[] = [];
const state = 0

// Game Setup
function setup() {
    players.push(new One(loader.resources.oneIdle.texture))

    app.stage.addChild(players[0].sprite)
    app.ticker.add((delta) => loop(delta))
}

function loop(delta: number): void {
    if (state === PLAY) {
        playState(delta)
    }
}

function playState(delta: number): void {
    const gamepads = navigator.getGamepads()
    if (gamepads[0] != null) {
        players[0].move(delta, gamepads[0].axes[0], gamepads[0].axes[1])
        if (gamepads[0].buttons[0].pressed) {
            players[0].jump()
        }
    } else {
        console.warn("Player 1 has disconnected")
    }
}

// Controller is connected
window.addEventListener("gamepadconnected", (e: any) => {
    const {index, id} = e.gamepad
    console.log(`Controller connected at index ${index}, ${id}`)
});

window.addEventListener("gamepaddisconnected", (e: any) => {
    const { index, id } = e.gamepad
    console.log(`Controller disconnected from index ${index}: ${id}`);
  });