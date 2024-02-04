import {Game} from "./Game.ts";

interface ExtendedEnemy {
    frameX:number
    frameY:number
    fps:number
    frameInterval:number
    frameTimer:number
    game: Game;
    width: number;
    height: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    maxFrame: number;
    image: HTMLImageElement;
}
export class Enemy {
    public frameX
    public frameY
    public fps
    public frameInterval
    public frameTimer
    public markForDeletion

    constructor() {
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameInterval = 1000 / this.fps
        this.frameTimer = 0
        this.markForDeletion = false
    }
    update(deltaTime:number, extendedEnemy?:ExtendedEnemy) {
        if (!extendedEnemy) {
            return
        }
        // movement
        extendedEnemy.x += extendedEnemy.speedX
        extendedEnemy.y += extendedEnemy.speedY

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0
            if (this.frameX < extendedEnemy.maxFrame) {
                this.frameX ++
            } else {
                this.frameX = 0
            }
        } else {
            this.frameTimer += deltaTime
        }

        if (extendedEnemy.x + extendedEnemy.width < 0) {
            this.markForDeletion = true
        }
    }
    draw(context:CanvasRenderingContext2D | null, extendedEnemy?:ExtendedEnemy) {
        if (!context || !extendedEnemy) {
            return
        }
        context.drawImage(extendedEnemy.image, this.frameX * extendedEnemy.width, 0, extendedEnemy.width, extendedEnemy.height, extendedEnemy.x, extendedEnemy.y, extendedEnemy.width, extendedEnemy.height)
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
    public va
    public angle
    constructor(game:Game) {
        super();
        this.game = game
        this.width = 60
        this.height =  44
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = Math.random() * -this.game.speed -3
        this.speedY = 0
        this.maxFrame = 5
        this.image = document.getElementById('enemyFly') as HTMLImageElement
        this.va = Math.random() * 0.1 + 0.1
        this.angle = 0
    }

    update(deltaTime: number) {
        super.update(deltaTime, this);
        this.angle += this.va
        this.y += Math.sin(this.angle)
    }

    draw(context: CanvasRenderingContext2D | null) {
        super.draw(context, this);
    }
}

export class GroundEnemy extends Enemy {
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
            this.height =  87
            this.x = this.game.width
            this.y = this.game.height - this.height - this.game.groundMargin
            this.speedX = -this.game.speed
            this.speedY = 0
            this.maxFrame = 1
            this.image = document.getElementById('enemyPlant') as HTMLImageElement
        }

        update(deltaTime: number) {
            super.update(deltaTime, this);
            this.speedX = -this.game.speed
        }
        draw(context: CanvasRenderingContext2D | null) {
            super.draw(context, this);
        }
}

export class ClimbingEnemy extends  Enemy {
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
        this.width = 120
        this.height =  144
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = 0
        this.speedY = Math.random() > 0.5 ? 1 : -1
        this.maxFrame = 5
        this.image = document.getElementById('enemySpider') as HTMLImageElement
    }

    update(deltaTime: number) {
        super.update(deltaTime, this);
        this.speedX = -this.game.speed
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.speedY = this.speedY * -1
        }
        if (this.y < -this.height) {
            this.markForDeletion = true
        }
    }
    draw(context: CanvasRenderingContext2D | null) {
        super.draw(context, this);
        context?.beginPath()
        context?.moveTo(this.x + this.width / 2,0)
        context?.lineTo(this.x + this.width / 2, this.y + 50)
        context?.stroke()
    }
}