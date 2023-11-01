import drawables from '/static/js/drawables.js'

/**
 * Make the function that draws the canvas application onto the given canvas
 * rendering context. The draw function will set itself up to repeat using
 * requestAnimationFrame.
 * @param {CanvasRenderingContext2D} canvasContext The canvas context for the
 * draw function to draw to.
 * @returns {() => void} The draw function.
 */
export default function makeDraw(canvasContext) {
  function draw() {
    canvasContext.clearRect(
      0,
      0,
      canvasContext.canvas.width,
      canvasContext.canvas.height
    )

    drawables.forEach(drawable => drawable.draw(canvasContext))

    window.requestAnimationFrame(draw)
  }

  return draw
}