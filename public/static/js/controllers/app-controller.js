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
 *  {name: 'pan-acting', grabStart: DisplayVector, offsetStart: DisplayVector} |
 *  {name: 'place'} |
 *  {name: 'move-selecting'} |
 *  {name: 'move-acting', drawable: Drawable, holdingOffset: PositionVector}
 * )} State
 */

/**
 * @typedef {(
 *  {name: 'mode-change', newMode: Mode} |
 *  {name: 'mouse-down', location: DisplayVector} |
 *  {name: 'mouse-up', location: DisplayVector} |
 *  {name: 'mouse-move', location: DisplayVector}
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
  #mousePosition = new DisplayVector(new Vector(0, 0))

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
    // A mouse up anywhere will end an action.
    document.addEventListener('mouseup', event => {this.handleAction({
      name: 'mouse-up',
      location: DisplayVector.fromMouseEvent(event, canvas),
    })})
    document.addEventListener('mousemove', event => {this.handleAction({
      name: 'mouse-move',
      location: DisplayVector.fromMouseEvent(event, canvas),
    })})    

    this.#canvasController.start()
    this.#uiController.start()
  }

  /** @param {Action} action */
  handleAction(action) {
    if (action.name !== 'mouse-move') {
      console.log({action})
      console.log({state: this.#state})
    }

    if (action.name === 'mode-change') {
      this.#state = AppController.#defaultStateForMode[action.newMode]
    } else if (action.name === 'mouse-move') {
      this.#mousePosition = action.location

      if (this.#state.name === 'pan-acting') {
        console.log('here')
        // This implements panning. I hope. Just... just draw it out I guess.
        this.#canvasController.positionCanvasOffset = action.location.minus(
          this.#state.grabStart.minus(this.#state.offsetStart),
        )
      }
    } else if (this.#state.name === 'pan-selecting' && action.name === 'mouse-down') {
      this.#state = {
        name: 'pan-acting',
        grabStart: action.location,
        // We store the offset from the start of the pan to minimise rounding.
        offsetStart: this.#canvasController.positionCanvasOffset,
      }
    } else if (this.#state.name === 'pan-acting' && action.name === 'mouse-up') {
      this.#state = {name: 'pan-selecting'}
    }
    
    if (action.name !== 'mouse-move') {
      console.log({state: this.#state})
    }
  }
}