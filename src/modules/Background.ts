import {Game} from './Game'

class Layer {
  public game
  public width
  public height
  public speedModifier
  public image
  public x
  public y

  constructor(game: Game, width: number, height: number, speedModifier: number, image: HTMLImageElement) {
    this.game = game
    this.height = height
    this.width = width
    this.speedModifier = speedModifier
    this.image = image
    this.x = 0
    this.y = 0
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0
    } else {
      this.x -= this.game.speed * this.speedModifier
    }
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}

export class Background {
  public game
  public width
  public height
  public layer1Image
  public layer2Image
  public layer3Image
  public layer4Image
  public layer5Image
  public layer1
  public layer2
  public layer3
  public layer4
  public layer5
  public backgroundLayers

  constructor(game: Game) {
    this.game = game
    this.width = 1667
    this.height = 500
    this.layer1Image = document.getElementById('layer1') as HTMLImageElement
    this.layer2Image = document.getElementById('layer2') as HTMLImageElement
    this.layer3Image = document.getElementById('layer3') as HTMLImageElement
    this.layer4Image = document.getElementById('layer4') as HTMLImageElement
    this.layer5Image = document.getElementById('layer5') as HTMLImageElement
    this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image)
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image)
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image)
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image)
    this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image)

    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5]
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update()
    })
  }

  draw(context: CanvasRenderingContext2D | null) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context)
    })
  }
}
