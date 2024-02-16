import {Game} from './modules/Game'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const audio = document.getElementById('music') as HTMLAudioElement
  audio.volume = 0

  audio.play()

  const ctx = canvas.getContext('2d')

  canvas.width = 1000
  canvas.height = 500

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime

    lastTime = timeStamp
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)

    if (!game.gameOver) {
      requestAnimationFrame(animate)
    }
  }

  animate(0)
})
