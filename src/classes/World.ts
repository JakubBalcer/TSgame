import { Drawable } from '../interfaces/Drawable'
import { Camera } from './Camera'
import { Tile } from './Tile'
import { Component } from './Component'
import { Maths } from '../utils/Maths'
import { Game } from '../Game'

export class World implements Drawable {
    private static instance: World
    camera: Camera
    map: Tile[][] // static objects
    tileWidth: number
    tileHeight: number
    width: number
    height: number
    tileSize: number
    entities: Component[] // moving objects

    private constructor() {
        this.tileWidth = 100
        this.tileHeight = 100
        this.tileSize = 50
        this.width = this.tileWidth * this.tileSize
        this.height = this.tileHeight * this.tileSize
        this.camera = new Camera(
            1140, // X in the world
            30, // Y in the world
            1280,
            720,
            this.width - 1280,
            this.height - 720
        )
        this.entities = new Array<Component>()
        this.genMap()
    }

    static getInstance(): World {
        if (!World.instance) World.instance = new World()
        return World.instance
    }

    setEntities(entities: Component[]): void {
        this.entities = entities
    }

    addEntity(entity: Component): void {
        this.entities.push(entity)
    }

    genMap(): void {
        this.map = []
        for (let x = 0; x < this.tileWidth; x++) {
            this.map[x] = []
            for (let y = 0; y < this.tileHeight; y++) {
                this.map[x][y] = new Tile(
                    x * this.tileSize,
                    y * this.tileSize,
                    this.tileSize,
                    this.tileSize
                )
            }
        }
    }

    draw(): void {
        let startCol = Math.floor(this.camera.x / this.tileSize)
        let endCol = startCol + this.camera.width / this.tileSize
        // endCol += 1
        let startRow = Math.floor(this.camera.y / this.tileSize)
        let endRow = startRow + this.camera.height / this.tileSize
        // endRow += 1
        let offsetX = -this.camera.x + startCol * this.tileSize
        let offsetY = -this.camera.y + startRow * this.tileSize
        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                let tile = this.map[r][c]
                let x = (c - startCol) * this.tileSize + offsetX
                let y = (r - startRow) * this.tileSize + offsetY
                if (tile) tile.draw(x, y) // drawing static objects
            }
        }
        for (let entity of this.entities) {
            let isEntityVisible = Maths.pointInRect(
                offsetX,
                offsetY,
                offsetX + this.camera.width,
                offsetY + this.camera.height,
                entity.x,
                entity.y
            )
            if (isEntityVisible) entity.draw()
        }
        let game = Game.getInstance()

        game.stage.ctx.fillStyle = 'green'
        game.stage.ctx.fillRect(1140, 30, 10, 10)
        game.stage.ctx.fillStyle = 'black'
    }
}
