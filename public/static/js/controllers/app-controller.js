import { NEW_BUTTON_ID } from '/static/js/config.js'

import { CanvasController } from '/static/js/controllers/canvas-controller.js'
import { UIController } from '/static/js/controllers/ui-controller.js'

import { Measurer } from '/static/js/models/drawables/measurer/index.js'
import { PositionVector, Vector } from '/static/js/models/vector.js'

/** @typedef {import('@/types/controller').Controller} Controller */

/**
 * Manages the app as a whole, including mediating interactions between the
 * canvas and the UI.
 * @implements {Controller}
 */
export class AppController {
  /** @type {CanvasController} */
  #canvasController
  /** @type {UIController} */
  #uiController

  /** @param {CanvasRenderingContext2D} displayCanvasContext  */
  constructor(displayCanvasContext) {
    this.#canvasController = new CanvasController(displayCanvasContext)
    this.#uiController = new UIController(displayCanvasContext.canvas)
  }
  
  start() {
    // Setup the new button. Stuff like this should be owned by the UI
    // Controller, but this is going to be deleted anyway so I'm not too fussed
    // about it being here for now.
    const newButton = document.getElementById(NEW_BUTTON_ID)
    if (newButton === null) {
      throw new Error(
        `Expected the element with ID ${NEW_BUTTON_ID} to exist, but it does ` +
          'not.',
      )
    }
  
    newButton.addEventListener('click', () => {
      const measurer = new Measurer(new PositionVector(new Vector(
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 500),
      )))
      this.#canvasController.addDrawable(measurer)
    })

    this.#canvasController.start()
    this.#uiController.start()
  }
}