import {
  POSITION_CANVAS_WIDTH,
  POSITION_CANVAS_HEIGHT,
  DISPLAY_CANVAS_BACKGROUND_COLOUR,
  POSITION_CANVAS_BACKGROUND_COLOUR,
} from '/static/js/config.js'

import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'
import { Vector, DisplayVector } from '/static/js/models/vector.js'

/** @typedef {import('@/types/drawable').Drawable} Drawable */
/** @typedef {import('@/types/controller').Controller} Controller */

/**
 * Manages tracking and updating the state of the display canvas.
 * @implements {Controller}
 */
export class CanvasController {
  /** @type {CanvasRenderingContext2D} */
  #displayCanvasContext

  /** @type {Record<number, Drawable>} */
  #drawables = []
  #nextDrawableKey = 0
  
  /** @type {DisplayVector} */
  positionCanvasOffset

  /** @param {CanvasRenderingContext2D} displayCanvasContext */
  constructor(displayCanvasContext) {
    this.#displayCanvasContext = displayCanvasContext

    // Centre the position canvas within the display canvas.
    const canvas = displayCanvasContext.canvas
    const widthOverflow = POSITION_CANVAS_WIDTH - canvas.clientWidth
    const heightOverflow = POSITION_CANVAS_HEIGHT - canvas.clientHeight
    this.positionCanvasOffset = new DisplayVector(new Vector(
      -widthOverflow / 2,
      -heightOverflow / 2,
    ))
  }
  
  start() {
    // Resize the canvas once so it starts at the right size.
    this.#resizeCanvas()
    // Keep the canvas size up-to-date.
    window.addEventListener('resize', () => this.#resizeCanvas())

    // Start the draw-loop.
    this.#startDrawing()
  }

  get displayCanvasContext() {
    return this.#displayCanvasContext
  }

  /**
   * Add the given drawable to the set of drawables, and return a key
   * identifying
   * @param {Drawable} newDrawable
   * @returns {number}
   */
  addDrawable(newDrawable) {
    const key = this.#nextDrawableKey++
    this.#drawables[key] = newDrawable
    return key
  }

  /** @param {number} key */
  removeDrawable(key) {
    delete this.#drawables[key]
  }

  /**
   * Update the size (in pixels) of the canvas image to be the same as the size
   * (in pixels) of the canvas element on the screen.
   */
  #resizeCanvas() {
    const canvas = this.#displayCanvasContext.canvas
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  #startDrawing() {
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
      Object.values(this.#drawables)
        .forEach(drawable => drawable.draw(positionCanvasContext))
  
      this.#displayCanvasContext.fillStyle = DISPLAY_CANVAS_BACKGROUND_COLOUR
      this.#displayCanvasContext.fillRect(
        0,
        0,
        this.#displayCanvasContext.canvas.width,
        this.#displayCanvasContext.canvas.height,
      )
  
      this.#displayCanvasContext.drawImage(
        positionCanvas,
        this.positionCanvasOffset.x,
        this.positionCanvasOffset.y,
      )
  
      window.requestAnimationFrame(draw)
    }

    draw()
  }
}
