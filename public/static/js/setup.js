import { Measurer } from '/static/js/models/drawables/measurer/index.js'

import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'

import { DISPLAY_CANVAS_ELEMENT_ID, NEW_BUTTON_ID } from '/static/js/config.js'
import { CanvasController } from '/static/js/controllers/canvas-controller.js'
import { UIController } from '/static/js/controllers/ui-controller.js'
import { PositionVector, Vector } from '/static/js/models/vector.js'

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

/** @param {CanvasController} canvasController */
function setupNewButton(canvasController) {
  const newButton = document.getElementById(NEW_BUTTON_ID)
  if (newButton === null) {
    throw new Error(
      `Expected the element with ID ${NEW_BUTTON_ID} to exist, but it does not.`,
    )
  }

  newButton.addEventListener('click', () => {
    const measurer = new Measurer(new PositionVector(new Vector(
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 500),
    )))
    canvasController.addDrawable(measurer)
  })
}

function setup() {
  const displayCanvas = document.getElementById(DISPLAY_CANVAS_ELEMENT_ID)
  if (!(displayCanvas instanceof HTMLCanvasElement)) {
    console.error(displayCanvas)
    throw new Error(
      `Expected the element with ID ${DISPLAY_CANVAS_ELEMENT_ID} to be an ` +
      `HTMLCanvasElement but got ${displayCanvas}.`,
    )
  }
  
  const windowResizeListener = makeWindowResizeListener(displayCanvas)
  // Call once so the canvas is initially set to the correct size.
  windowResizeListener()
  window.addEventListener('resize', windowResizeListener)

  const displayCanvasContext = getCanvasContext(displayCanvas)

  const canvasController = new CanvasController(displayCanvasContext)
  new UIController(displayCanvas)

  setupNewButton(canvasController)

  // Start the drawing loop.
  canvasController.startDrawing()
}

setup()