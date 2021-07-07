import { Scene } from '../classes/Scene'
import { Card } from '../components/Card'
export class Field extends Scene {
    constructor() {
        super()
        this.init()
    }

    init(): void {
        super.createWorld()
        let card = new Card(600, 200, 100, 160, '../../public/assets/card.png')

        super.addDrawable(card)
    }
}
