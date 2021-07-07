export interface State {
    mouseDown: { x: number; y: number; firing: boolean }
    mouseMove: { x: number; y: number; firing: boolean }
    dragging: { x: number; y: number; firing: boolean }
}
