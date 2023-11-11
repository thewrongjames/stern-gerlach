import { DISPLAY_CANVAS_ELEMENT_ID } from '/static/js/config.js'
import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'
import { AppController } from '/static/js/controllers/app-controller.js'

function setup() {
  const displayCanvas = document.getElementById(DISPLAY_CANVAS_ELEMENT_ID)
  if (!(displayCanvas instanceof HTMLCanvasElement)) {
    console.error(displayCanvas)
    throw new Error(
      `Expected the element with ID ${DISPLAY_CANVAS_ELEMENT_ID} to be an ` +
      `HTMLCanvasElement but got ${displayCanvas}.`,
    )
  }

  const displayCanvasContext = getCanvasContext(displayCanvas)

  const appController = new AppController(displayCanvasContext)
  console.log(1)
  appController.start()
  console.log(Infinity)
}

setup()