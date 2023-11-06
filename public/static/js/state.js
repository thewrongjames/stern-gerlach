/** @typedef {import('@/types/drawable').Drawable} Drawable */

import { MODE_RADIO_NAME } from '/static/js/config.js'
import { Vector, DisplayVector } from '/static/js/models/vector.js'

/** @type {['pan', 'place', 'move']} */
const modes = ['pan', 'place', 'move']
/** @typedef {(typeof modes)[number]} Mode */

export class State {
  /** @type {State|null} */
  static #instance = null
  static #allowConstruction = false

  /** @type {Drawable[]} */
  #drawables

  /** @type {CanvasRenderingContext2D} */
  #displayCanvasContext
  /** @type {Mode} */
  #mode
  /** @type {DisplayVector} */
  #mousePosition
  /** @type {DisplayVector} */
  #positionCanvasOffset

  /**
   * Create an instance of the state singleton. This should not be constructed
   * directly; get instance should be used instead.
   * @param {CanvasRenderingContext2D} displayCanvasContext The canvas rendering
   * context of the actually displayed canvas.
   */
  constructor(displayCanvasContext) {
    if (!State.#allowConstruction) {
      throw new Error(
        'State should not be constructed directly. Use State.getInstance.',
      )
    }

    this.#drawables = []

    this.#displayCanvasContext = displayCanvasContext
    this.#mode = State.#getSelectedMode()
    this.#mousePosition = new DisplayVector(new Vector(0, 0))
    this.#positionCanvasOffset = new DisplayVector(new Vector(0, 0))

    // Listen for updates to the mode.
    document.querySelectorAll(
      `input[name = "${MODE_RADIO_NAME}"]`,
    ).forEach(element => {
      element.addEventListener('change', () => {
        this.#mode = State.#getSelectedMode()
        console.log(this.#mode)
      })
    })

    // Listen for updates to the mouse position.
    document.addEventListener('mousemove', event => {
      const { left, top } = this.#displayCanvasContext.canvas.getBoundingClientRect()

      this.#mousePosition = new DisplayVector(new Vector(
        event.clientX - left,
        event.clientY - top,
      ))

      console.log(this.#mousePosition.vector)
    })
  }

  /**
   * Get the state singleton, creating it if it does not yet exist.
   * @param {CanvasRenderingContext2D} displayCanvasContext The canvas rendering
   * context of the actually displayed canvas.
   * @returns {State}
   */
  static getInstance(displayCanvasContext) {
    if (State.#instance !== null) {
      return State.#instance
    }
  
    State.#allowConstruction = true
    State.#instance = new State(displayCanvasContext)
    State.#allowConstruction = false
    return State.#instance
  }
  
  /** @returns {Mode} */
  static #getSelectedMode() {
    const querySelector = `input[name = "${MODE_RADIO_NAME}"]:checked`
    const selectedModeInput = document.querySelector(querySelector)
      
    if (selectedModeInput === null) {
      throw new Error('Failed to get selected mode: could not find element.')
    }
    if (!(selectedModeInput instanceof HTMLInputElement)) {
      throw new Error(
        'Failed to get selected mode: expected element to be ' +
            `HTMLInputElement but got ${selectedModeInput}.`,
      )
    }
  
    const mode = selectedModeInput.value
  
    for (const testMode of modes) {
      if (testMode === mode) {
        return testMode
      }
    }
  
    throw new Error(`Failed to get selected mode: got invalid mode "${mode}"`)
  }

  get drawables() {
    return this.#drawables
  }
  get mode() {
    return this.#mode
  }
  get displayCanvasContext() {
    return this.#displayCanvasContext
  }
  get positionCanvasOffset() {
    return this.#positionCanvasOffset
  }

  /** @param {Drawable} newDrawable */
  addDrawable(newDrawable) {
    this.#drawables.push(newDrawable)
  }
}
