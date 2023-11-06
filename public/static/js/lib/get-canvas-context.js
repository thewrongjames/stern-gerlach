/**
 * Get the 2D canvas rendering context for the given canvas, or error trying.
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D} 
 */
export function getCanvasContext(canvas) {
  if (!canvas.getContext) {
    throw new Error('Canvas is not supported.')
  }
  const canvasContext = canvas.getContext('2d')
  if (canvasContext === null) {
    throw new Error('Failed to get the canvas 2D context.')
  }

  return canvasContext
}