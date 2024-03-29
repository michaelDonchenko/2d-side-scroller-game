import {Game} from './Game'
import {ExtendedState, Falling, Hit, Jumping, Rolling, Running, Sitting} from './PlayerState'
import {CollisionAnimation} from './collisionAnimation'

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
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Hit(this.game),
    ]
    this.currentState = this.states[0]
  }

  update(input: string[], deltaTime: number) {
    this.checkCollisions()
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
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
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

  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        // collision detected when all 4 conditions are true
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markForDeletion = true
        this.game.collisions.push(
          new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5)
        )

        if (this.currentState === this.states[4]) {
          this.game.score++
        } else {
          this.setState(5, 0)
        }
      }
    })
  }
}
