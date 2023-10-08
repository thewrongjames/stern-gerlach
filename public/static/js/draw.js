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
    canvasContext.beginPath()
    canvasContext.arc(75, 75, 50, 0, Math.PI * 2, true) // Outer circle
    canvasContext.moveTo(110, 75)
    canvasContext.arc(75, 75, 35, 0, Math.PI, false) // Mouth (clockwise)
    canvasContext.moveTo(65, 65)
    canvasContext.arc(60, 65, 5, 0, Math.PI * 2, true) // Left eye
    canvasContext.moveTo(95, 65)
    canvasContext.arc(90, 65, 5, 0, Math.PI * 2, true) // Right eye
    canvasContext.stroke()

    window.requestAnimationFrame(draw)
  }

  return draw
}