import { Drawable } from '../interfaces/Drawable'
import { Ui } from '../classes/Ui'
import { World } from './World'
import { Interactable } from '../interfaces/Interactable';

export abstract class Scene {
    drawables: Drawable[]
    world: World
    ui: Ui
    interactables: Interactable[]


    constructor() {
        this.drawables = new Array<Drawable>()
        this.interactables = new Array<Interactable>()
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

    addInteractable(interactable: Interactable): void {
        this.interactables.push(interactable)
    }
    


    // ABSTRACT METHODS

    abstract init(): void
}
