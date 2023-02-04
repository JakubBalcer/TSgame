import { Component } from '../classes/Component'
import { Clickable } from '../interfaces/Clickable'
import { Events, Game } from '../Game'
import { Interactable } from '../interfaces/Interactable'
import { createEvents } from '../utils/Events'

export class Button extends Component implements Clickable, Interactable {
    action: Function
    events: Events

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        img: string
    ) {
        super(x, y, width, height, img)
        this.events = createEvents()
    }

    setAction(action: Function): void {
        this.action = action
        // Game.getInstance().subscribeClick(this)
        this.events.click.push(this)
    }

    click(fn?: Function): void {
        if (!fn) this.action()
        else fn()
    }
}
