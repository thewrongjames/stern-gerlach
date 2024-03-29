import { MODE_RADIO_NAME } from '/static/js/config.js'

/** @typedef {import('@/types/controller').Controller} Controller */

/** @type {['pan', 'place', 'move']} */
const modes = ['pan', 'place', 'move']
/** @typedef {(typeof modes)[number]} Mode */

/**
 * Manages tracking and updating the state of the UI.
 * @implements {Controller}
 */
export class UIController {
  /** @type {HTMLCanvasElement} */
  #displayCanvas
  /** @type {Mode} */
  #mode = 'pan'

  /**
   * A callback triggered whenever the "mode" changes. It is also called with
   * the current mode value when the start method is run.
   * @type {(newMode: Mode) => void}
   */
  onModeChange = () => {}

  /** @param {HTMLCanvasElement} displayCanvas */
  constructor(displayCanvas) {
    this.#displayCanvas = displayCanvas
  }

  start() {
    this.#setMode(UIController.#getSelectedMode())

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
        this.#setMode(UIController.#getSelectedMode())
      })
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

  /** @param {Mode} newMode */
  #setMode(newMode) {
    this.#mode = newMode
    this.#displayCanvas.dataset['mode'] = newMode
    this.onModeChange(newMode)
  }

  get mode() {
    return this.#mode
  }
}