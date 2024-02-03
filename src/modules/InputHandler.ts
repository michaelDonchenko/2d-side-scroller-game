export class InputHandler {
  public keys: string[]
  constructor() {
    this.keys = []

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd' || event.key === 'Enter') &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key)
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd' || event.key === 'Enter') {
        this.keys.splice(this.keys.indexOf(event.key), 1)
      }
    })
  }
}
