import { Scene } from '../classes/Scene'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Game } from '../Game'

export class Menu extends Scene {
    constructor() {
        super()
        this.init()
    }

    init(): void {
        let startGameBtn: Button = new Button(
            200,
            200,
            160,
            60,
            '../../public/assets/startgame.png'
        )
        startGameBtn.setAction(() => {
            Game.getInstance().stage.changeScene('field')
        })
        let continueButton: Button = new Button(
            200,
            270,
            160,
            60,
            '../../public/assets/continue.png'
        )
        continueButton.setAction(() => {
            console.log('continue clicked')
        })
        let optionsButton: Button = new Button(
            200,
            340,
            160,
            60,
            '../../public/assets/options.png'
        )
        optionsButton.setAction(() => {
            console.log('options clicked')
        })
        let card = new Card(600, 200, 100, 160, '../../public/assets/card.png')

        // Adding drawables to scene (for display)
        super.addDrawable([startGameBtn, optionsButton, continueButton, card])
    }
}
