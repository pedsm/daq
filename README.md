# Don't ask questions

[![Build Status](https://travis-ci.org/pedsm/daq.svg?branch=master)](https://travis-ci.org/pedsm/daq)

A 1v1 figthing game


## Documentation 

The engine `main.ts` contains all the abstractions neccesary for allowing full extension of characters and projectiles. In order to add new game objects you must understand the following concepts.

### Character

An interface for playable characters, these are barebones at they allow for fully customizable characters

```typescript
interface Charater {
    sprite: Sprite,
    hp: number,
    stats: Stats,
    index: number,
    move(delta: number, xStick: number, yStick: number): void,
    collide(dmg: number, obj: Sprite): void,
    jump(): void
    basicAttack(xStick: number, yStick: number): Projectile | null
}

```

### Projectiles

All projectiles returned by attack funcitons are then generated in the game. Projectiles must follow the Projectile interface

```typescript
interface Projectile {
    sprite: Sprite,
    dmg: number,
    hp: number,
    vel: Vector,
    hitbox: HitBox,
    update(delta: number): void,
    collide(): void,
    destroy(): void,
}
```

### HitBoxes

Projectiles must also contain HitBoxes attached to them in order to proprely handle collision.