import {Game} from './Game'

export class InputHandler {
  public keys: string[]
  public game: Game

  constructor(game: Game) {
    this.keys = []
    this.game = game

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd' || event.key === 'Enter') &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key)
      } else if (event.key === 'e') {
        this.game.debug = !this.game.debug
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd' || event.key === 'Enter') {
        this.keys.splice(this.keys.indexOf(event.key), 1)
      }
    })
  }
}
