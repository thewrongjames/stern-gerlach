/** @typedef {import('@/types/drawable').Drawable} Drawable */

import { Vector, DisplayVector } from '/static/js/models/vector.js'

export class CanvasController {
  /** @type {Drawable[]} */
  #drawables

  /** @type {CanvasRenderingContext2D} */
  #displayCanvasContext
  /** @type {DisplayVector} */
  #positionCanvasOffset

  /**
   * Create an instance of the state singleton. This should not be constructed
   * directly; get instance should be used instead.
   * @param {CanvasRenderingContext2D} displayCanvasContext The canvas rendering
   * context of the actually displayed canvas.
   */
  constructor(displayCanvasContext) {
    this.#drawables = []

    this.#displayCanvasContext = displayCanvasContext
    this.#positionCanvasOffset = new DisplayVector(new Vector(0, 0))
  }

  get drawables() {
    return this.#drawables
  }
  get displayCanvasContext() {
    return this.#displayCanvasContext
  }
  get positionCanvasOffset() {
    return this.#positionCanvasOffset
  }

  /** @param {Drawable} newDrawable */
  addDrawable(newDrawable) {
    this.#drawables.push(newDrawable)
  }
}
