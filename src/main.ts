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
import { collisionTest } from "./physics"
import Projectile from "./Projectile"
import { drawHpBar } from "./ui"

// Const definitions
const PLAY = 0

// Web Gl testing
let type = "WebGL"
if (!utils.isWebGLSupported()) {
    type = "canvas"
}
utils.sayHello(`Running on ${type}`)

// Initial setup
const HEIGHT = window.innerHeight - 5
const WIDTH = window.innerWidth - 5
const app = new Application({
    autoResize: true,
    height: HEIGHT,
    width: WIDTH,
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
const hpBars: Sprite[] = []
const hpBarsBack: Sprite[] = []
let projectiles: Projectile[] = []
const state = 0

// Game Setup
function setup() {
    const bg: Sprite = new Sprite(loader.resources.uiBg.texture);
    const ratio = bg.height / bg.width
    bg.width = WIDTH
    bg.height = WIDTH * ratio
    app.stage.addChild(bg)
    // Set up players and hp bars
    players.push(new One(loader.resources.oneIdle.texture, 0))
    hpBars.push(new Sprite(loader.resources.uiFullbar.texture))
    hpBarsBack.push(new Sprite(loader.resources.uiEmptybar.texture))
    players.push(new One(loader.resources.oneIdle.texture, 1))

    players[1].sprite.x = 400
    players[1].sprite.y = 400

    hpBars.forEach((hpBar) => {
        app.stage.addChild(hpBar)
    })
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
                    if (!Array.isArray(projs)) {
                        projs = [projs]
                    }
                    projs.forEach((proj) => {
                        projectiles.push(proj)
                        if (proj.sprite == null) {
                            return
                        }
                        app.stage.addChild(proj.sprite)
                        proj.sprite.addChild(proj.hitbox.drawable)
                    })
                }
            }
            // Draw hp Bars
            hpBars[i].x = players[i].sprite.x - (hpBars[i].width / 2)
            hpBars[i].y = players[i].sprite.y - players[i].sprite.width
            hpBars[i].width = players[i].hp
            hpBars[i].height = 20
        }
    }
    projectiles = projectiles.filter((projectile: Projectile) => {
        if (projectile.sprite == null) {
            return false
        }
        projectile.update(delta)
        // Off-screen garbage collection
        const bounds = projectile.hitbox.drawable.getBounds()
        if (
            bounds.x > WIDTH ||
            bounds.x < 0 - bounds.width ||
            bounds.y > HEIGHT ||
            bounds.y < 0 - bounds.height
        ) {
            projectile.sprite.destroy()
            console.log("Projectile destroyed")
            return false
        }
        players.forEach((player) => {
            if (player.index === projectile.hitbox.index) {
                return
            }
            const playerBounds = player.hitbox.getBounds()
            const projBound = projectile.hitbox.getBounds()
            if (collisionTest(playerBounds, projBound)) {
                player.collide(projectile.hp)
                projectile.destroy()
            }
        })
        return true
    })
    // Debug zone
    if (DEBUG) {
        // projectiles.forEach((projectile) => {
            // projectile.hitbox.update(projectile.sprite.getBounds())
        // })
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