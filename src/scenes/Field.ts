import { Scene } from '../classes/Scene'
import { World } from '../classes/World'
import { Card } from '../components/Card'
export class Field extends Scene {
    constructor() {
        super()
        this.init()
    }

    init(): void {
        // super.createWorld()
        let card = new Card(1140, 30, 100, 160, './assets/card.png')
        // World.getInstance().addEntity(card)

        super.addDrawable(card)
        super.addInteractable(card)
    }
}
