import { Drawable } from '../interfaces/Drawable'
import { Ui } from '../classes/Ui'
import { World } from './World'

export abstract class Scene {
    drawables: Drawable[]
    world: World
    ui: Ui

    constructor() {
        this.drawables = new Array<Drawable>()
    }

    draw(): void {
        if (this.world) this.world.draw()
        for (let drawable of this.drawables) drawable.draw()
    }

    addDrawable(drawables: Array<Drawable>): void
    addDrawable(drawable: Drawable): void
    addDrawable(drawable: Array<Drawable> | Drawable): void {
        if (Array.isArray(drawable)) this.drawables.push(...drawable)
        else this.drawables.push(drawable)
    }

    createWorld(): void {
        this.world = World.getInstance()
    }

    // ABSTRACT METHODS

    abstract init(): void
}
