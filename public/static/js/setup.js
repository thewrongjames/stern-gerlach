import { CANVAS_ELEMENT_ID } from '/static/js/config.js'
import makeDraw from '/static/js/draw.js'

/**
 * Make a function designed to be attached to the window as a resize event
 * listener that syncs the size of the canvas image with the size of the canvas
 * element.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @returns {() => void} The resize listener.
 */
function makeWindowResizeListener(canvas) {
  return () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
}

function setup() {
  const canvas = document.getElementById(CANVAS_ELEMENT_ID)
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error(canvas)
    throw new Error(
      `Expected the element with ID ${CANVAS_ELEMENT_ID} to be an ` +
      `HTMLCanvasElement but got ${canvas}.`
    )
  }

  if (!canvas.getContext) {
    throw new Error('Canvas is not supported.')
  }
  const canvasContext = canvas.getContext('2d')
  if (canvasContext === null) {
    throw new Error('Failed to get the canvas 2D context.')
  }
  
  const windowResizeListener = makeWindowResizeListener(canvas)
  // Call once so the canvas is initially set to the correct size.
  windowResizeListener()
  window.addEventListener('resize', windowResizeListener)

  makeDraw(canvasContext)()
}

setup()