import { MODE_RADIO_NAME } from '/static/js/config.js'
import { Vector, DisplayVector } from '/static/js/models/vector.js'

/** @type {['pan', 'place', 'move']} */
const modes = ['pan', 'place', 'move']
/** @typedef {(typeof modes)[number]} Mode */

/**
 * Manages tracking and updating the state of the UI.
 */
export class UIController {
  /** @type {Mode} */
  #mode
  /** @type {DisplayVector} */
  #mousePosition

  /** @param {HTMLCanvasElement} displayCanvas */
  constructor(displayCanvas) {
    this.#mode = UIController.#getSelectedMode()
    this.#mousePosition = new DisplayVector(new Vector(0, 0))

    const modeRadioButtons = document.querySelectorAll(
      `input[name = "${MODE_RADIO_NAME}"]`,
    )
    if (modeRadioButtons.length !== modes.length) {
      console.error(modeRadioButtons)
      throw new Error(
        'Expected the same number of mode radio buttons as modes ' +
        `(${modes.length}) but got ${modeRadioButtons.length}.`,
      )
    }

    // Listen for updates to the mode.
    modeRadioButtons.forEach(element => {
      element.addEventListener('change', () => {
        this.#mode = UIController.#getSelectedMode()
        console.log(this.#mode)
      })
    })

    // Listen for updates to the mouse position.
    document.addEventListener('mousemove', event => {
      const { left, top } = displayCanvas.getBoundingClientRect()

      this.#mousePosition = new DisplayVector(new Vector(
        event.clientX - left,
        event.clientY - top,
      ))

      console.log(this.#mousePosition.vector)
    })
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

  get mode() {
    return this.#mode
  }
  get mousePosition() {
    return this.#mousePosition
  }
}