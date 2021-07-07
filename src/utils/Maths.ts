export abstract class Maths {
    static pointInRect(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x: number,
        y: number
    ): boolean {
        return x > x1 && x < x2 && y > y1 && y < y2
    }
}
