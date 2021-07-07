import { Component } from '../classes/Component'

export class Bob extends Component {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, 'res/castle.png')
    }
}
