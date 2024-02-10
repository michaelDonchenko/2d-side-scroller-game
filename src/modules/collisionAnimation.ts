import {Game} from './Game'

export class CollisionAnimation {
  public game: Game
  public x
  public y
  public image: HTMLImageElement
  public spriteWidth
  public spriteHeight
  public spriteModifier
  public width
  public height
  public frameX
  public maxFrame
  public markForDeletion
  public fps
  public frameInterval
  public frameTimer

  constructor(game: Game, x: number, y: number) {
    this.game = game
    this.image = document.getElementById('boom') as HTMLImageElement
    this.spriteHeight = 90
    this.spriteWidth = 100
    this.spriteModifier = Math.random() + 0.5
    this.width = this.spriteModifier * this.spriteWidth
    this.height = this.spriteModifier * this.spriteHeight
    this.x = x - this.width * 0.5
    this.y = y - this.height * 0.5
    this.frameX = 0
    this.maxFrame = 4
    this.markForDeletion = false
    this.fps = 10
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) return

    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update(deltaTime: number) {
    this.x -= this.game.speed
    if (this.frameTimer > this.frameInterval) {
      this.frameX++
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime
    }
    if (this.frameX > this.maxFrame) {
      this.markForDeletion = true
    }
  }
}
