import {
    Application,
    Graphics,
    loader,
    Sprite,
    utils,
} from "pixi.js"
import { assets } from "./assetsList"
import Charater from "./Character";
import One from "./chars/One"
import HitBox from "./HitBox";
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
    height: window.innerHeight,
    width: window.innerWidth,
})

document.body.appendChild(app.view)

// Loading textures to gpu
assets.forEach((asset) => {
    const { character, name } = asset
    loader.add(character + name, `../assets/${character}/${name}.png`)
})
loader.load(setup)

// Game Declarations
const DEBUG = true;
const players: Charater[] = []
const projectiles: Projectile[] = []
const hitboxes: HitBox[] = []
const state = 0

// Game Setup
function setup() {
    players.push(new One(loader.resources.oneIdle.texture, 0))
    players.push(new One(loader.resources.oneIdle.texture, 1))

    players[1].sprite.x = 400
    players[1].sprite.y = 400

    players.forEach((player) => {
        app.stage.addChild(player.sprite)
    })
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
            // B || Rt to attack
            if (gamepads[i].buttons[1].pressed || gamepads[i].buttons[7].pressed) {
                let projs = players[i].basicAttack(gamepads[i].axes[2], gamepads[i].axes[3])
                if (projs != null) {
                    if(!Array.isArray(projs)) {
                        projs = [projs]
                    }
                    projs.forEach((proj) => {
                        projectiles.push(proj)
                        hitboxes.push(proj.hitbox)
                        app.stage.addChild(proj.sprite)
                        app.stage.addChild(proj.hitbox.drawable)
                    })
                }
            }
        }
    }
    projectiles.forEach((projectile) => {
        projectile.update(delta)
    })
    // Debug zone
    if (DEBUG) {
        projectiles.forEach((projectile) => {
            projectile.hitbox.update(projectile.sprite.getBounds())
        })
    }
}

// Controller is connected
window.addEventListener("gamepadconnected", (e: any) => {
    const { index, id } = e.gamepad
    console.log(`Controller connected at index ${index}, ${id}`)
});

window.addEventListener("gamepaddisconnected", (e: any) => {
    const { index, id } = e.gamepad
    console.log(`Controller disconnected from index ${index}: ${id}`);
  });