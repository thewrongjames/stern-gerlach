import { measurerCanvas } from '/static/js/canvases/measurer.js'

/** @typedef {import('@/types/drawable').Drawable} Drawable */

/** @implements {Drawable} */
export class Measurer {
  /**
   * Create a Measurer at the given x and y coordinates.
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * @param {CanvasRenderingContext2D} canvasContext 
   */
  draw(canvasContext) {
    canvasContext.drawImage(measurerCanvas, this.x, this.y)
  }
}