/** @typedef {import('/static/js/state').State} State */

/**
 * @typedef Vector
 * @property {number} x
 * @property {number} y
 */

/**
 * Return a new vector that is the sum of the two given vectors.
 * @param {Vector} firstVector 
 * @param {Vector} secondVector 
 * @returns {Vector}
 */
function addVectors(firstVector, secondVector) {
  return {x: firstVector.x + secondVector.x, y: firstVector.y + secondVector.y}
}

/**
 * A vector in the coordinate space of pixels in the actually displayed canvas.
 */
export class DisplayVector {
  /** @type {Vector} */
  #vector

  /** @param {Vector} vector */
  constructor(vector) {
    this.#vector = vector
  }
  
  get vector() {
    return this.#vector
  }

  /**
   * Get this DisplayVector as its corresponding PositionVector, given a
   * particular global state. Note that once this global state changes, this
   * mapping may no long be accurate.
   * @param {State} state 
   */
  toPositionVector(state) {
    // TODO: This.
    console.log(state)
    throw new Error('Not implemented.')
  }

  /**
   * @param {DisplayVector} other
   * @returns {DisplayVector}
   */
  plus(other) {
    return new DisplayVector(addVectors(this.vector, other.vector))
  }
}

/**
 * A vector in the abstract coordinate space in which objects are placed. Maybe
 * be scaled and offset before it becomes a DisplayVector.
 */
export class PositionVector {
  /** @type {Vector} */
  #vector

  /** @param {Vector} vector */
  constructor(vector) {
    this.#vector = vector
  }
  
  get vector() {
    return this.#vector
  }

  /**
   * Get this PositionVector as its corresponding DisplayVector, given a
   * particular global state. Note that once this global state changes, this
   * mapping may no long be accurate.
   * @param {State} state 
   */
  toDisplayVector(state) {
    // TODO: This.
    console.log(state)
    throw new Error('Not implemented')
  }

  /**
   * @param {PositionVector} other
   * @returns {PositionVector}
   */
  plus(other) {
    return new PositionVector(addVectors(this.vector, other.vector))
  }
}
