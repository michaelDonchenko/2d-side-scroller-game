import {Game} from "./Game.ts";

export class Enemy  {
    public frameX
    public frameY
    public fps
    public frameInterval
    public frameTimer

    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
    }
    update(deltaTime:number) {
        // movement
        this.x += this.speedX
        this.y += this.speedY

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < this.maxFrame) {
                this.frameX ++
            } else {
                this.frameX = 0
            }
        } else {
            this.frameTimer += deltaTime
        }
    }
    draw(context:CanvasRenderingContext2D | null) {
        if (!context) {
            return
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingEnemy extends Enemy {
    public game
    public width
    public height
    public x
    public y
    public speedX
    public speedY
    public maxFrame
    public image: HTMLImageElement
    constructor(game:Game) {
        super();
        this.game = game
        this.width = 60
        this.height =  44
        this.x = 900
        this.y = 200
        this.speedX = -2
        this.speedY = 0
        this.maxFrame = 5
        this.image = document.getElementById('enemyFly') as HTMLImageElement

    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }
}

// class GroundEnemy extends Enemy {
//
// }
//
// class ClimbingEnemy extends  Enemy {}