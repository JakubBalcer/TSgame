import { Game } from './Game'

function main() {
    let game: Game = Game.getInstance()
    game.init()
    game.loop()
}

main()
