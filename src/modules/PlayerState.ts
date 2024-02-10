import {Dust, Fire} from './Particle'
import {Game} from './Game'

const state = {
  sitting: 0,
  running: 1,
  jumping: 2,
  falling: 3,
  rolling: 4,
  hit: 5,
} as const

export class State {
  public state: string
  constructor(state: string) {
    this.state = state
  }
}

export interface ExtendedState extends State {
  enter: () => void
  handleInput: (input: string[]) => void
}

export class Sitting extends State {
  public game: Game

  constructor(game: Game) {
    super('sitting')
    this.game = game
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 4
    this.game.player.frameY = 5
  }

  handleInput(input: string[]) {
    if (input.includes('d') || input.includes('a')) {
      this.game.player.setState(state.running, 1)
    } else if (input.includes('Enter')) {
      this.game.player.setState(state.rolling, 2)
    }
  }
}

export class Running extends State {
  public game: Game

  constructor(game: Game) {
    super('running')
    this.game = game
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 8
    this.game.player.frameY = 3
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Dust(this.game, this.game.player.x + this.game.player.width / 3, this.game.player.y + this.game.player.height)
    )

    if (input.includes('s')) {
      this.game.player.setState(state.sitting, 0)
    } else if (input.includes('w')) {
      this.game.player.setState(state.jumping, 1)
    } else if (input.includes('Enter')) {
      this.game.player.setState(state.rolling, 2)
    }
  }
}

export class Jumping extends State {
  public game: Game

  constructor(game: Game) {
    super('jumping')
    this.game = game
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy -= 27
    }
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 1
  }

  handleInput(input: string[]) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(state.falling, 1)
    } else if (input.includes('Enter')) {
      this.game.player.setState(state.rolling, 2)
    }
  }
}

export class Falling extends State {
  public game: Game

  constructor(game: Game) {
    super('falling')
    this.game = game
  }

  enter() {
    if (this.game.player.onGround()) {
      this.game.player.vy -= 30
    }
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 2
  }

  handleInput() {
    if (this.game.player.onGround()) {
      this.game.player.setState(state.running, 1)
    }
  }
}

export class Rolling extends State {
  public game: Game

  constructor(game: Game) {
    super('rolling')
    this.game = game
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
    this.game.player.frameY = 6
  }

  handleInput(input: string[]) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    )

    if (!input.includes('Enter') && this.game.player.onGround()) {
      this.game.player.setState(state.running, 1)
    } else if (!input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(state.falling, 1)
    } else if (input.includes('Enter') && input.includes('w') && this.game.player.onGround()) {
      this.game.player.vy -= 27
    }
  }
}

export class Hit extends State {
  public game: Game

  constructor(game: Game) {
    super('hit')
    this.game = game
  }

  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 10
    this.game.player.frameY = 4
  }

  handleInput() {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(state.running, 1)
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(state.falling, 1)
    }
  }
}
