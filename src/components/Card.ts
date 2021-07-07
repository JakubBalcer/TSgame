import { Component } from '../classes/Component'
import { Draggable } from '../interfaces/Draggable'
import { Game } from '../Game'

export class Card extends Component implements Draggable {
    action: Function

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        img: string
    ) {
        super(x, y, width, height, img)
        Game.getInstance().subscribeDrag(this)
    }

    setAction(action: Function): void {
        this.action = action
    }

    drag(dX: number, dY: number): void {
        this.x -= dX
        this.y -= dY
    }
}
