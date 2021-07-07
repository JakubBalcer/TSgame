import { Drawable } from '../interfaces/Drawable'
import { Point } from '../interfaces/Point'
import { Stage } from '../Stage'

export abstract class Component implements Drawable {
    x: number
    y: number
    width: number
    height: number
    img: HTMLImageElement

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        img?: string
    ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        if (img) {
            this.img = document.createElement('img')
            this.img.src = img
        }
    }

    draw(): void {
        if (this.img) {
            let ctx = Stage.getInstance().ctx
            ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.img.width,
                this.img.height
            )
        }
    }

    containsPoint(point: Point): boolean {
        return (
            point.x > this.x &&
            point.x < this.x + this.width &&
            point.y > this.y &&
            point.y < this.y + this.height
        )
    }
}
