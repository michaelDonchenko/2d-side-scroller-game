import {Game} from './Game'
import {ExtendedState, Falling, Jumping, Running, Sitting} from './PlayerState'

export class Player {
  public game: Game
  public width: number
  public height: number
  public x: number
  public y: number
  public frameX: number
  public frameY: number
  public maxFrame: number
  public fps: number
  public frameInterval: number
  public frameTimer: number
  public vy: number
  public image: HTMLImageElement
  public speed: number
  public maxSpeed: number
  public weight: number
  public states: Array<ExtendedState>
  public currentState: ExtendedState

  constructor(game: Game) {
    this.game = game
    this.width = 100
    this.height = 91.3
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 5
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.image = document.getElementById('player') as HTMLImageElement
    this.speed = 0
    this.maxSpeed = 10
    this.vy = 0
    this.weight = 1
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)]
    this.currentState = this.states[0]
    this.currentState.enter()
  }

  update(input: string[], deltaTime: number) {
    this.currentState.handleInput(input)
    // horizontal movement
    this.x += this.speed

    if (input.includes('d')) {
      this.speed = this.maxSpeed
    } else if (input.includes('a')) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }

    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width

    // vertical movement
    this.y += this.vy

    if (!this.onGround()) {
      this.vy += this.weight
    } else {
      this.vy = 0
    }

    // sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return
    }
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }

  setState(state: number, speed: number) {
    this.currentState = this.states[state]
    this.game.speed = speed * this.game.maxSpeed
    this.currentState.enter()
  }
}
