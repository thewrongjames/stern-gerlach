import {
  POSITION_CANVAS_WIDTH,
  POSITION_CANVAS_HEIGHT,
  DISPLAY_CANVAS_BACKGROUND_COLOUR,
  POSITION_CANVAS_BACKGROUND_COLOUR,
} from '/static/js/config.js'
import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'

/** @typedef {import("/static/js/controllers/canvas-controller").CanvasController} CanvasController */

/**
 * Make the function that draws the canvas application onto the canvas rendering
 * context on the given state. The draw function will set itself up to repeat
 * using requestAnimationFrame.
 * @param {CanvasController} state
 * @returns {() => void} The draw function.
 */
export function makeDraw(state) {
  function draw() {
    const positionCanvas = document.createElement('canvas')
    positionCanvas.width = POSITION_CANVAS_WIDTH
    positionCanvas.height = POSITION_CANVAS_HEIGHT
    const positionCanvasContext = getCanvasContext(positionCanvas)

    positionCanvasContext.fillStyle = POSITION_CANVAS_BACKGROUND_COLOUR
    positionCanvasContext.fillRect(
      0,
      0,
      positionCanvas.width,
      positionCanvas.height,
    )
    state.drawables.forEach(drawable => drawable.draw(positionCanvasContext))

    state.displayCanvasContext.fillStyle = DISPLAY_CANVAS_BACKGROUND_COLOUR
    state.displayCanvasContext.fillRect(
      0,
      0,
      state.displayCanvasContext.canvas.width,
      state.displayCanvasContext.canvas.height,
    )

    state.displayCanvasContext.drawImage(
      positionCanvas,
      state.positionCanvasOffset.x,
      state.positionCanvasOffset.y,
    )

    window.requestAnimationFrame(draw)
  }

  return draw
}