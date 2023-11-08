import { measurerCanvas } from '/static/js/models/drawables/measurer/canvas.js'

/** @typedef {import('@/types/drawable').Drawable} Drawable */
/** @typedef {import('/static/js/models/vector').PositionVector} PositionVector */

/** @implements {Drawable} */
export class Measurer {
  /** @type {PositionVector} */
  #position

  /**
   * Create a Measurer at the given position.
   * @param {PositionVector} position
   */
  constructor(position) {
    this.#position = position
  }

  /**
   * @param {CanvasRenderingContext2D} canvasContext 
   */
  draw(canvasContext) {
    canvasContext.drawImage(measurerCanvas, this.#position.x, this.#position.y)
  }
}