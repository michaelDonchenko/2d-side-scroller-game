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

    // score
    context.fillText('Score: ' + this.game.score, 20, 50)

    // timer
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    context.fillText('Time: ' + (this.game.time / 1000).toFixed(1), 20, 80)

    // game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily
      if (this.game.score > 100) {
        context.fillText('You won!', this.game.width * 0.5, this.game.height * 0.5 - 20)
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.fillText(
          'What are creatures of the dark afraid of? YOU!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
      } else {
        context.fillText('Nice try!', this.game.width * 0.5, this.game.height * 0.5 - 20)
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.fillText('Better luck next time', this.game.width * 0.5, this.game.height * 0.5 + 20)
      }
    }
  }
}
