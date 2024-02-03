import {Player} from './Player'

const state = {
  sitting: 0,
  running: 1,
  jumping: 2,
  falling: 3,
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
  public player: Player

  constructor(player: Player) {
    super('sitting')
    this.player = player
  }

  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 4
    this.player.frameY = 5
  }

  handleInput(input: string[]) {
    if (input.includes('d') || input.includes('a')) {
      this.player.setState(state.running, 1)
    }
  }
}

export class Running extends State {
  public player: Player

  constructor(player: Player) {
    super('running')
    this.player = player
  }

  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 8
    this.player.frameY = 3
  }

  handleInput(input: string[]) {
    if (input.includes('s')) {
      this.player.setState(state.sitting, 0)
    } else if (input.includes('w')) {
      this.player.setState(state.jumping, 1)
    }
  }
}

export class Jumping extends State {
  public player: Player

  constructor(player: Player) {
    super('jumping')
    this.player = player
  }

  enter() {
    if (this.player.onGround()) {
      this.player.vy -= 27
    }
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 1
  }

  handleInput() {
    if (this.player.vy > this.player.weight) {
      this.player.setState(state.falling, 1)
    }
  }
}

export class Falling extends State {
  public player: Player

  constructor(player: Player) {
    super('falling')
    this.player = player
  }

  enter() {
    if (this.player.onGround()) {
      this.player.vy -= 30
    }
    this.player.frameX = 0
    this.player.maxFrame = 6
    this.player.frameY = 2
  }

  handleInput() {
    if (this.player.onGround()) {
      this.player.setState(state.running, 1)
    }
  }
}
