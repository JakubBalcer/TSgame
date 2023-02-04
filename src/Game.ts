import { Stage } from './Stage'
import { Menu } from './scenes/Menu'
import { State } from './interfaces/State'
import { Clickable } from './interfaces/Clickable'
import { Draggable } from './interfaces/Draggable'
import { Maths } from './utils/Maths'
import { Field } from './scenes/Field'
import { KeyboardInput } from './interfaces/KeyboardInput'
import { World } from './classes/World'
import { Scene } from './classes/Scene'

export interface Events {
    click: Clickable[]
    mouseMove: Function[]
    drag: Draggable[]
    keyPress: KeyboardInput[]
}

export class Game {
    stage: Stage
    events: Events
    state: State
    private static instance: Game

    private constructor() {
        this.stage = Stage.getInstance(1280, 720)
        this.stage.onSceneChange((scene: Scene) => {
            this.updateEvents(scene)
        })
        this.clearEvents()
        this.state = {
            mouseMove: { x: 0, y: 0, firing: false },
            mouseDown: { x: 0, y: 0, firing: false },
            dragging: { x: 0, y: 0, firing: false, element: null },
        }
    }

    clearEvents(): void {
        this.events = {
            click: new Array<Clickable>(),
            mouseMove: new Array<Function>(),
            drag: new Array<Draggable>(),
            keyPress: new Array<KeyboardInput>(),
        }
    }

    static getInstance(): Game {
        if (!Game.instance) Game.instance = new Game()
        return Game.instance
    }

    init(): void {
        this.setEvents()
        // ADD ALL SCENES
        this.stage.addScene('menu', new Menu())
        this.stage.addScene('field', new Field())
        // SELECT MAIN SCENE
        this.stage.changeScene('menu')
    }

    loop(): void {
        this.stage.ctx.fillRect(0, 0, this.stage.width, this.stage.height)
        this.logic()
        this.stage.draw()
        this.handleDragging()
        // DON'T TOUCH
        this.state.mouseMove.firing = false
        requestAnimationFrame(this.loop.bind(this))
    }

    logic(): void {}

    updateEvents(scene: Scene): void {
        this.clearEvents()
        for (let interactable of scene.interactables) {
            this.events.click.push(...interactable.events.click)
            this.events.drag.push(...interactable.events.drag)
            this.events.keyPress.push(...interactable.events.keyPress)
            this.events.mouseMove.push(...interactable.events.mouseMove)
        }
    }

    setEvents(): void {
        this.stage.canvas.onmousedown = e => {
            this.state.mouseDown = { firing: true, x: e.x, y: e.y }
        }
        this.stage.canvas.onmouseup = e => {
            this.state.mouseDown = { firing: false, x: e.x, y: e.y }
        }
        this.stage.canvas.onmousemove = e => {
            this.state.mouseMove = { firing: true, x: e.x, y: e.y }
        }
        this.stage.canvas.onclick = e => {
            for (let obj of this.events.click) {
                if (
                    Maths.pointInRect(
                        obj.x,
                        obj.y,
                        obj.x + obj.width,
                        obj.y + obj.height,
                        e.x,
                        e.y
                    )
                )
                    obj.click()
            }
        }
        document.onkeydown = e => {
            for (let obj of this.events.keyPress)
                if (obj.keyboardEvents.has(e.key))
                    obj.keyboardEvents.get(e.key)(World.getInstance().camera)
        }
    }

    subscribeClick(obj: Clickable): void {
        this.events.click.push(obj)
    }

    subscribeMouseMove(fn: Function): void {
        this.events.mouseMove.push(fn)
    }

    subscribeDrag(obj: Draggable): void {
        this.events.drag.push(obj)
    }

    subscribeKeyPress(obj: KeyboardInput): void {
        this.events.keyPress.push(obj)
    }

    handleDragging(): void {
        if (!this.state.mouseDown.firing) {
            this.state.dragging.firing = false
            this.state.dragging.element = null
        }
        if (
            (this.state.mouseDown.firing && this.state.mouseMove.firing) ||
            this.state.dragging.firing
        ) {
            if (!this.state.dragging.element) {
                for (let obj of this.events.drag) {
                    if (
                        Maths.pointInRect(
                            obj.x,
                            obj.y,
                            obj.x + obj.width,
                            obj.y + obj.height,
                            this.state.mouseDown.x,
                            this.state.mouseDown.y
                        )
                    ) {
                        this.state.dragging.element = obj
                        this.state.dragging.firing = true
                    }
                }
            }
            if (!this.state.dragging.firing) return
            let xOffset = this.state.mouseDown.x - this.state.mouseMove.x
            let yOffset = this.state.mouseDown.y - this.state.mouseMove.y
            this.state.mouseDown.x -= xOffset
            this.state.mouseDown.y -= yOffset
            this.state.dragging.element.drag(xOffset, yOffset)
        }
    }
}
