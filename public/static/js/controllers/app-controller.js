import { NEW_BUTTON_ID } from '/static/js/config.js'

import { CanvasController } from '/static/js/controllers/canvas-controller.js'
import { UIController } from '/static/js/controllers/ui-controller.js'

import { Measurer } from '/static/js/models/drawables/measurer/index.js'
import { DisplayVector, PositionVector, Vector } from '/static/js/models/vector.js'

/** @typedef {import('@/types/controller').Controller} Controller */
/** @typedef {import('@/types/drawable').Drawable} Drawable */
/** @typedef {import('/static/js/controllers/ui-controller').Mode} Mode */

/**
 * @typedef {(
 *  {name: 'pan-selecting'} |
 *  {name: 'pan-panning', start: DisplayVector} |
 *  {name: 'place'} |
 *  {name: 'move-selecting'} |
 *  {name: 'move-moving', drawable: Drawable, holdingOffset: PositionVector}
 * )} State
 */

/**
 * @typedef {(
 *  {name: 'mode-change', newMode: Mode} |
 *  {name: 'mouse-down', location: DisplayVector} |
 *  {name: 'mouse-up', location: DisplayVector}
 * )} Action
 */

/**
 * Manages the app as a whole, including mediating interactions between the
 * canvas and the UI.
 * @implements {Controller}
 */
export class AppController {
  /** @type {Record<Mode,State>} */
  static #defaultStateForMode = {
    'pan': {name: 'pan-selecting'},
    'place': {name: 'place'},
    'move': {name: 'move-selecting'},
  }

  /** @type {CanvasController} */
  #canvasController
  /** @type {UIController} */
  #uiController
  /** @type {State} */
  #state

  /** @param {CanvasRenderingContext2D} displayCanvasContext  */
  constructor(displayCanvasContext) {
    this.#canvasController = new CanvasController(displayCanvasContext)
    this.#uiController = new UIController(displayCanvasContext.canvas)

    this.#state = AppController.#defaultStateForMode[this.#uiController.mode]
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

    // Setup the action hooks.
    this.#uiController.onModeChange = newMode => {
      this.handleAction({name: 'mode-change', newMode})
    }
    const canvas = this.#canvasController.displayCanvasContext.canvas
    canvas.addEventListener('mousedown', event => {this.handleAction({
      name: 'mouse-down',
      location: DisplayVector.fromMouseEvent(event, canvas),
    })})
    canvas.addEventListener('mouseup', event => {this.handleAction({
      name: 'mouse-up',
      location: DisplayVector.fromMouseEvent(event, canvas),
    })})

    this.#canvasController.start()
    this.#uiController.start()
  }

  /** @param {Action} action */
  handleAction(action) {
    console.log(action)
  }
}