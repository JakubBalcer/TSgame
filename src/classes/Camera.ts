export class Camera {
    x: number
    y: number
    width: number
    height: number
    maxX: number
    maxY: number

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        maxX: number,
        maxY: number
    ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.maxX = maxX
        this.maxY = maxY
    }
}
