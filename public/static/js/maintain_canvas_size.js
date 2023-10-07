const CANVAS_ELEMENT_ID = 'canvas'

function handleWindowResize () {
  const canvasElement = document.getElementById(CANVAS_ELEMENT_ID)
  if (canvasElement === null) {
    console.error("Failed to get canvas element.")
    return
  }

  canvasElement.width = canvasElement.clientWidth
  canvasElement.height = canvasElement.clientHeight
}

export function setupWindowResizeListener () {
  window.addEventListener('resize', handleWindowResize)
}