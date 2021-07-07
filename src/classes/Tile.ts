import { Drawable } from '../interfaces/Drawable'
import { Stage } from '../Stage'

export class Tile implements Drawable {
    x: number
    y: number
    width: number
    height: number
    occupied: boolean

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw(x: number, y: number): void {
        let ctx = Stage.getInstance().ctx
        ctx.strokeStyle = '#FFFFFF'
        ctx.strokeRect(Math.round(x), Math.round(y), this.width, this.height)
    }
}
