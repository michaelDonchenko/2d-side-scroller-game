import {Game} from './Game'

export interface ExtendedParticle {
  game: Game
  markForDeletion: boolean
  x: number
  y: number
  speedX: number
  speedY: number
  size: number
  color?: string
  update: (extendedParticle?: ExtendedParticle) => void
  draw: (context: CanvasRenderingContext2D | null, extendedParticle?: ExtendedParticle) => void
}

export class Particle {
  public game: Game
  public markForDeletion

  constructor(game: Game) {
    this.game = game
    this.markForDeletion = false
  }

  update(extendedParticle?: ExtendedParticle) {
    if (!extendedParticle) {
      return
    }
    extendedParticle.x -= extendedParticle.speedX + this.game.speed
    extendedParticle.y -= extendedParticle.speedY
    extendedParticle.size *= 0.97
    if (extendedParticle.size < 0.5) {
      this.markForDeletion = true
    }
  }
}

export class Dust extends Particle {
  public x
  public y
  public size
  public speedX
  public speedY
  public color

  constructor(game: Game, x: number, y: number) {
    super(game)
    this.x = x
    this.y = y
    this.size = Math.random() * 10 + 5
    this.speedX = Math.random() * 3
    this.speedY = Math.random() * 3
    this.color = 'rgba(0,0,0,0.2)'
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return
    }

    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
  }
}

export class Splash extends Particle {
  constructor(game: Game) {
    super(game)
  }
}

export class Fire extends Particle {
  public x
  public y
  public size
  public speedX
  public speedY
  public image
  public angle
  public va

  constructor(game: Game, x: number, y: number) {
    super(game)
    this.x = x
    this.y = y
    this.size = Math.random() * 50 + 50
    this.speedX = 1
    this.speedY = 1
    this.image = document.getElementById('fire') as HTMLImageElement
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
  }

  update(extendedParticle?: ExtendedParticle | undefined): void {
    super.update(extendedParticle)
    this.angle += this.va
    this.x += Math.sin(this.angle * 10)
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return
    }

    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size)
    context.restore()
  }
}
