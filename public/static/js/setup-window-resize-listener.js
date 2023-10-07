const CANVAS_ELEMENT_ID = 'canvas'

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

export default function setupWindowResizeListener() {
  const canvas = document.getElementById(CANVAS_ELEMENT_ID)
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error(canvas)
    throw new Error(
      `Expected the element with ID ${CANVAS_ELEMENT_ID} to be an ` +
      `HTMLCanvasElement but got ${canvas}`
    )
  }

  window.addEventListener('resize', makeWindowResizeListener(canvas))
}
