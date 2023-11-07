/** @typedef {import('@/types/drawable').Drawable} Drawable */

import {
  POSITION_CANVAS_WIDTH,
  POSITION_CANVAS_HEIGHT,
  DISPLAY_CANVAS_BACKGROUND_COLOUR,
  POSITION_CANVAS_BACKGROUND_COLOUR,
} from '/static/js/config.js'

import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'
import { Vector, DisplayVector } from '/static/js/models/vector.js'

export class CanvasController {
  /** @type {CanvasRenderingContext2D} */
  #displayCanvasContext

  /** @type {Drawable[]} */
  #drawables
  /** @type {DisplayVector} */
  #positionCanvasOffset

  /** @param {CanvasRenderingContext2D} displayCanvasContext */
  constructor(displayCanvasContext) {
    this.#displayCanvasContext = displayCanvasContext
    
    this.#drawables = []
    this.#positionCanvasOffset = new DisplayVector(new Vector(0, 0))
  }

  /** @param {Drawable} newDrawable */
  addDrawable(newDrawable) {
    this.#drawables.push(newDrawable)
  }

  startDrawing() {
    // An arrow function so it doesn't re-bind "this" to be itself.
    const draw = () => {
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
      this.#drawables.forEach(drawable => drawable.draw(positionCanvasContext))
  
      this.#displayCanvasContext.fillStyle = DISPLAY_CANVAS_BACKGROUND_COLOUR
      this.#displayCanvasContext.fillRect(
        0,
        0,
        this.#displayCanvasContext.canvas.width,
        this.#displayCanvasContext.canvas.height,
      )
  
      this.#displayCanvasContext.drawImage(
        positionCanvas,
        this.#positionCanvasOffset.x,
        this.#positionCanvasOffset.y,
      )
  
      window.requestAnimationFrame(draw)
    }

    draw()
  }
}
