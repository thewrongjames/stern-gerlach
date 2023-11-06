/** @typedef {import("/static/js/state").State} State */

/**
 * Make the function that draws the canvas application onto the canvas rendering
 * context on the given state. The draw function will set itself up to repeat
 * using requestAnimationFrame.
 * @param {State} state
 * @returns {() => void} The draw function.
 */
export function makeDraw(state) {
  function draw() {
    state.canvasContext.clearRect(
      0,
      0,
      state.canvasContext.canvas.width,
      state.canvasContext.canvas.height,
    )

    state.drawables.forEach(drawable => drawable.draw(state.canvasContext))

    window.requestAnimationFrame(draw)
  }

  return draw
}