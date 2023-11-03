/** @typedef {import('@/types/drawable').Drawable} Drawable */

import { MODE_RADIO_NAME } from '/static/js/config.js'

/** @type {['none', 'placing']} */
const modes = ['none', 'placing']
/** @typedef {(typeof modes)[number]} Mode */

class State {
  /** @type {State|null} */
  static #instance = null

  /** @type {Drawable[]} */
  #drawables

  /** @type {Mode} */
  #mode

  /**
   * Get the state singleton.
   * @returns {State}
   */
  static getInstance() {
    if (State.#instance !== null) {
      return State.#instance
    }

    State.#instance = new State()
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

  constructor() {
    // Set the initial values for the drawables and the mode.
    this.#drawables = []
    this.#mode = State.#getSelectedMode()

    // Listen for updates to the mode.
    document.querySelectorAll(
      `input[name = "${MODE_RADIO_NAME}"]`,
    ).forEach(element => {
      element.addEventListener('change', () => {
        this.#mode = State.#getSelectedMode()
        console.log(this.#mode)
      })
    })
  }

  /** @returns {Drawable[]} */
  get drawables() {
    return this.#drawables
  }

  /** @param {Drawable} newDrawable */
  addDrawable(newDrawable) {
    this.#drawables.push(newDrawable)
  }

  /** @returns {Mode} */
  get mode() {
    return this.#mode
  }
}

/**
 * The global state for the application.
 * @type {State}
 */
export const state = State.getInstance()