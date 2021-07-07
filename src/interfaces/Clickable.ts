export interface Clickable {
    x: number
    y: number
    width: number
    height: number
    action: Function

    setAction(action: Function): void
    click(fn?: Function): void
}
