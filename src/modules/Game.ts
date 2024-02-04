import {Background} from './Background'
import {InputHandler} from './InputHandler'
import {Player} from './Player'
import {ClimbingEnemy, Enemy, FlyingEnemy, GroundEnemy} from "./Enemies.ts";

export class Game {
  public width
  public height
  public player
  public input
  public groundMargin
  public speed
  public background
  public maxSpeed
  public enemies: Enemy[]
  public enemyTimer
  public enemyInterval

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.groundMargin = 80
    this.background = new Background(this)
    this.player = new Player(this)
    this.input = new InputHandler()
    this.speed = 0
    this.maxSpeed = 3
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
  }

  update(deltaTime: number) {
    this.background.update()
    this.player.update(this.input.keys, deltaTime)
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime)
      if (enemy.markForDeletion) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
      }
    })

    // handleEnemies
    if (this.enemyTimer > this.enemyInterval) {
      this.enemyTimer = 0

      this.addEnemy()
    } else {
      this.enemyTimer += deltaTime
    }
  }

  draw(context: CanvasRenderingContext2D | null) {
    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach(enemy => {
      enemy.draw(context)
    })
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() > 0.5) {
      this.enemies.push(new GroundEnemy(this))
    } else if (this.speed > 0) {
      this.enemies.push(new ClimbingEnemy(this))
    }
    const flyingEnemy = new FlyingEnemy(this)
    this.enemies.push(flyingEnemy)
  }
}
