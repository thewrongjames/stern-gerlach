import { measurerCanvas } from '/static/js/canvases/measurer.js'

/** @typedef {import('@/types/drawable').Drawable} Drawable */

/** @implements {Drawable} */
export class Measurer {
  constructor() {
    this.x = Math.floor(Math.random() * 1000)
    this.y = Math.floor(Math.random() * 500)
  }

  /**
   * @param {CanvasRenderingContext2D} canvasContext 
   */
  draw(canvasContext) {
    canvasContext.drawImage(measurerCanvas, this.x, this.y)
  }
}