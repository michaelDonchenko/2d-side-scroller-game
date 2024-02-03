import {Background} from './Background'
import {InputHandler} from './InputHandler'
import {Player} from './Player'

export class Game {
  public width
  public height
  public player
  public input
  public groundMargin
  public speed
  public background
  public maxSpeed

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 80
    this.background = new Background(this)
    this.player = new Player(this)
    this.input = new InputHandler()
    this.speed = 0
    this.maxSpeed = 3
  }

  update(deltaTime: number) {
    this.background.update()
    this.player.update(this.input.keys, deltaTime)
  }

  draw(context: CanvasRenderingContext2D | null) {
    this.background.draw(context)
    this.player.draw(context)
  }
}
