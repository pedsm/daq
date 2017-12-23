import {
    Application,
    loader,
    Sprite,
    utils,
} from "pixi.js"
import { assets } from "./assetsList"
import Charater from "./Character";
import One from "./chars/One"
import Projectile from "./Projectile";

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
assets.forEach((asset) => {
    const { character, name } = asset
    loader.add(character + name, `../assets/${character}/${name}.png`)
})
loader.load(setup)

// Game Declarations
const players: Charater[] = []
const projectiles: Projectile[] = []
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
    // Interface with all players with controllers
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i] != null) {
            players[i].move(delta, gamepads[i].axes[0], gamepads[i].axes[1])
            // A to jump
            if (gamepads[i].buttons[0].pressed) {
                players[i].jump()
            }
            // B to attack
            if (gamepads[i].buttons[1].pressed) {
                const proj = players[i].basicAttack(gamepads[i].axes[2], gamepads[i].axes[3])
                if (proj != null) {
                    projectiles.push(proj)
                    app.stage.addChild(proj.sprite)
                }
            }
        }
    }
    projectiles.forEach((projectile) => {
        projectile.update(delta)
    })
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