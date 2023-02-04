import { Events } from "../Game"
import { Clickable } from "../interfaces/Clickable"
import { Draggable } from "../interfaces/Draggable"
import { KeyboardInput } from "../interfaces/KeyboardInput"

export const createEvents = (): Events => {
    return {
        click: new Array<Clickable>(),
        mouseMove: new Array<Function>(),
        drag: new Array<Draggable>(),
        keyPress: new Array<KeyboardInput>(),
    }
}