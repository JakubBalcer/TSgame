import { Scene } from './classes/Scene'
import { Interactable } from './interfaces/Interactable'

export class Stage {
    width: number
    height: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    scenes: Map<string, Scene>
    currentScene: Scene
    interactables: Interactable[]
    private onSceneChangeFn: Function
    private static instance: Stage

    private constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.setCanvas(this.width, this.height)
        this.scenes = new Map<string, Scene>()
    }

    static getInstance(width?: number, height?: number): Stage {
        if (!Stage.instance) Stage.instance = new Stage(width, height)
        return Stage.instance
    }

    setCanvas(width: number, height: number): void {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = width
        this.canvas.height = height
        document.body.appendChild(this.canvas)
    }

    addScene(name: string, scene: Scene): void {
        if (this.scenes.has(name)) throw new Error('Scene already exists')
        this.scenes.set(name, scene)
    }

    changeScene(name: string): void {
        this.currentScene = this.scenes.get(name)
        this.loadInteractables(this.currentScene)
        if (this.onSceneChangeFn) this.onSceneChangeFn(this.currentScene)
    }

    private loadInteractables(scene: Scene): void {
        this.interactables = scene.interactables
    }

    setScene(scene: Scene): void {
        this.currentScene = scene
    }

    draw(): void {
        this.currentScene.draw()
    }

    onSceneChange(fn: (scene: Scene) => void): void {
        this.onSceneChangeFn = fn
    }
}
