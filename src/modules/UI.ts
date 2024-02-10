import {Game} from './Game'

export class UI {
  public game
  public fontSize
  public fontFamily

  constructor(game: Game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return
    }

    context.font = this.fontSize + 'px ' + this.fontFamily
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    context.fillText('Score: ' + this.game.score, 20, 50)
  }
}
