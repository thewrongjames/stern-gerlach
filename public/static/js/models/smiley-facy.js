/** @typedef {import('@/types/drawable').Drawable} Drawable */

/** @implements {Drawable} */
export default class SmileyFace {
  constructor() {
    this.x = Math.floor(Math.random() * 1000)
    this.y = Math.floor(Math.random() * 500)
  }

  /**
   * @param {CanvasRenderingContext2D} canvasContext 
   */
  draw(canvasContext) {
    canvasContext.beginPath()
    canvasContext.arc(this.x + 75, this.y + 75, 50, 0, Math.PI * 2, true) // Outer circle
    canvasContext.moveTo(this.x + 110, this.y + 75)
    canvasContext.arc(this.x + 75, this.y + 75, 35, 0, Math.PI, false) // Mouth (clockwise)
    canvasContext.moveTo(this.x + 65, this.y + 65)
    canvasContext.arc(this.x + 60, this.y + 65, 5, 0, Math.PI * 2, true) // Left eye
    canvasContext.moveTo(this.x + 95, this.y + 65)
    canvasContext.arc(this.x + 90, this.y + 65, 5, 0, Math.PI * 2, true) // Right eye
    canvasContext.stroke()
  }
}