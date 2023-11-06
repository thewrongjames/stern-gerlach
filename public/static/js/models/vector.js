/** @typedef {import('/static/js/state').State} State */

/**
 * @typedef VectorLike
 * @property {number} x
 * @property {number} y
 */

/** @implements {VectorLike} */
export class Vector {
  /** @type {number} */
  #x
  /** @type {number} */
  #y
  
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor (x, y) {
    this.#x = x
    this.#y = y
  }
  
  get x() {
    return this.#x
  }
  get y() {
    return this.#y
  }

  /**
   * @param {Vector} other
   * @returns {Vector}
   */
  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }
}

/**
 * A vector in the coordinate space of pixels in the actually displayed canvas.
 * @implements {VectorLike}
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
  get x() {
    return this.#vector.x
  }
  get y() {
    return this.#vector.y
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
    return new DisplayVector(this.vector.plus(other.vector))
  }
}

/**
 * A vector in the abstract coordinate space in which objects are placed. Maybe
 * be scaled and offset before it becomes a DisplayVector.
 * @implements {VectorLike}
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
  get x() {
    return this.#vector.x
  }
  get y() {
    return this.#vector.y
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
    return new PositionVector(this.vector.plus(other.vector))
  }
}