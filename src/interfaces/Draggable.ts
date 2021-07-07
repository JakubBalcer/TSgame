export interface Draggable {
    x: number
    y: number
    width: number
    height: number
    action: Function

    setAction(action: Function): void
    drag: (dX: number, dY: number) => void
}
