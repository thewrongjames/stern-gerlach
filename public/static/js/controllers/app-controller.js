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
 *  {name: 'place', temporaryDrawable: Drawable, temporaryDrawableKey: number} |
 *  {name: 'move-selecting'} |
 *  {name: 'move-acting', drawable: Drawable, holdingOffset: PositionVector}
 * )} State
 */

/**
 * @typedef {(
 *  {name: 'mode-change', newMode: Mode} |
 *  {name: 'mouse-down', mouseLocation: DisplayVector} |
 *  {name: 'mouse-up', mouseLocation: DisplayVector} |
 *  {name: 'mouse-move', mouseLocation: DisplayVector}
 * )} Action
 */

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
  /** @type {State} */
  #state = {name: 'pan-selecting'}
  /** @type {DisplayVector} */
  #mouseLocation = new DisplayVector(new Vector(0, 0))

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

    // Setup the action hooks.
    this.#uiController.onModeChange = newMode => {
      this.handleAction({name: 'mode-change', newMode})
    }
    const canvas = this.#canvasController.displayCanvasContext.canvas
    canvas.addEventListener('mousedown', event => {this.handleAction({
      name: 'mouse-down',
      mouseLocation: DisplayVector.fromMouseEvent(event, canvas),
    })})
    document.addEventListener('mouseup', event => {this.handleAction({
      name: 'mouse-up',
      mouseLocation: DisplayVector.fromMouseEvent(event, canvas),
    })})
    document.addEventListener('mousemove', event => {this.handleAction({
      name: 'mouse-move',
      mouseLocation: DisplayVector.fromMouseEvent(event, canvas),
    })})    

    this.#canvasController.start()
    this.#uiController.start()
  }

  /** @param {Action} action */
  handleAction(action) {
    if ('mouseLocation' in action) {
      this.#mouseLocation = action.mouseLocation
    }

    if (action.name === 'mode-change') {
      this.handleModeChange(action.newMode)
    } else if (this.#state.name === 'pan-acting' && action.name === 'mouse-move') {
      this.handlePanning(action.mouseLocation, this.#state.grabStart, this.#state.offsetStart)
    } else if (this.#state.name === 'pan-selecting' && action.name === 'mouse-down') {
      this.handleStartPanning(action.mouseLocation)
    } else if (this.#state.name === 'pan-acting' && action.name === 'mouse-up') {
      this.handleStopPanning()
    }
  }

  /** @param {Mode} newMode */
  handleModeChange(newMode) {
    // Handle leaving the current mode.
    if (this.#state.name === 'place') {
      this.#canvasController.removeDrawable(this.#state.temporaryDrawableKey)
    }

    switch (newMode) {
    case 'pan':
      this.#state = {name: 'pan-selecting'}
      break

    case 'place': {
      // TODO: Place this at the mouse.
      const temporaryDrawable = new Measurer(new PositionVector(new Vector(0, 0)))
      const temporaryDrawableKey = this.#canvasController.addDrawable(temporaryDrawable)
      this.#state = {name: 'place', temporaryDrawable, temporaryDrawableKey}

      break
    }

    case 'move':
      this.#state = {name: 'move-selecting'}
      break

    default: {
      /** @type {never} Ensure all cases are covered. */
      // eslint-disable-next-line no-unused-vars
      const _ = newMode
      break
    }
    }
  }

  /**
   * @param {DisplayVector} mouseLocation
   * @param {DisplayVector} grabStart
   * @param {DisplayVector} offsetStart
   */
  handlePanning(mouseLocation, grabStart, offsetStart) {
    // This implements panning. I hope. Just... just draw it out I guess.
    // p = m - (g - o).
    this.#canvasController.positionCanvasOffset = mouseLocation.minus(
      grabStart.minus(offsetStart),
    )
  }

  /** @param {DisplayVector} mouseLocation */
  handleStartPanning(mouseLocation) {
    this.#state = {
      name: 'pan-acting',
      grabStart: mouseLocation,
      // We store the offset from the start of the pan to minimise rounding.
      offsetStart: this.#canvasController.positionCanvasOffset,
    }
  }

  handleStopPanning() {
    this.#state = {name: 'pan-selecting'}
  }
}