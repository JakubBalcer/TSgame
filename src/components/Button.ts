import { Component } from '../classes/Component'
import { Clickable } from '../interfaces/Clickable'
import { Game } from '../Game'

export class Button extends Component implements Clickable {
    action: Function

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        img: string
    ) {
        super(x, y, width, height, img)
    }

    setAction(action: Function): void {
        this.action = action
        Game.getInstance().subscribeClick(this)
    }

    click(fn?: Function): void {
        if (!fn) this.action()
        else fn()
    }
}
