import { Measurer } from '/static/js/models/measurer.js'

import { getCanvasContext } from '/static/js/lib/getCanvasContext.js'

import { CANVAS_ELEMENT_ID, NEW_BUTTON_ID } from '/static/js/config.js'
import { makeDraw } from '/static/js/draw.js'
import { drawables } from '/static/js/drawables.js'

/**
 * Make a function designed to be attached to the window as a resize event
 * listener that syncs the size of the canvas image with the size of the canvas
 * element.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @returns {() => void} The resize listener.
 */
function makeWindowResizeListener(canvas) {
  return () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
}

function setupNewButton() {
  const newButton = document.getElementById(NEW_BUTTON_ID)
  if (newButton === null) {
    throw new Error(
      `Expected the element with ID ${NEW_BUTTON_ID} to exist, but it does not.`,
    )
  }

  newButton.addEventListener('click', () => {
    const smileyFace = new Measurer(
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 500),
    )
    drawables.push(smileyFace)
  })
}

function setup() {
  const canvas = document.getElementById(CANVAS_ELEMENT_ID)
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error(canvas)
    throw new Error(
      `Expected the element with ID ${CANVAS_ELEMENT_ID} to be an ` +
      `HTMLCanvasElement but got ${canvas}.`,
    )
  }

  const canvasContext = getCanvasContext(canvas)
  
  const windowResizeListener = makeWindowResizeListener(canvas)
  // Call once so the canvas is initially set to the correct size.
  windowResizeListener()
  window.addEventListener('resize', windowResizeListener)

  setupNewButton()

  // Start the drawing loop.
  makeDraw(canvasContext)()
}

setup()