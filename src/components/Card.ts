import { Component } from '../classes/Component'
import { Draggable } from '../interfaces/Draggable'
import { Events, Game } from '../Game'
import { KeyboardInput } from '../interfaces/KeyboardInput'
import { Camera } from '../classes/Camera'
import { World } from '../classes/World'
import { Interactable } from '../interfaces/Interactable'
import { createEvents } from '../utils/Events'

export class Card extends Component implements Draggable, KeyboardInput, Interactable {
    action: Function
    keyboardEvents: Map<string, Function>
    camera: Camera
    events: Events

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        img: string
    ) {
        super(x, y, width, height, img)
        this.keyboardEvents = new Map<string, Function>()
        // let game: Game = Game.getInstance()
        this.camera = World.getInstance().camera
        this.setKeyboardEvents()
        this.events = createEvents()
        this.events.drag.push(this)
        this.events.keyPress.push(this)
    }

    setKeyboardEvents(): void {
        this.keyboardEvents.set('w', function (ctx) {
            ctx.y -= 10
        })
        this.keyboardEvents.set('s', function (ctx) {
            ctx.y += 10
        })
        this.keyboardEvents.set('a', function (ctx) {
            ctx.x -= 10
        })
        this.keyboardEvents.set('d', function (ctx) {
            ctx.x += 10
        })
    }

    setAction(action: Function): void {
        this.action = action
    }

    drag(dX: number, dY: number): void {
        this.x -= dX
        this.y -= dY
    }
}
