export class GameState {
    private static instance: GameState

    private constructor() {}

    static getInstance(): GameState {
        if (!GameState.instance) GameState.instance = new GameState()
        return GameState.instance
    }

    serialize(): void {}

    deserialize(): void {}
}
