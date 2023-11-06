import { getCanvasContext } from '/static/js/lib/get-canvas-context.js'

const MEASURER_WIDTH = 100
const MEASURER_HEIGHT = 50

export const measurerCanvas = document.createElement('canvas')

measurerCanvas.width = MEASURER_WIDTH
measurerCanvas.height = MEASURER_HEIGHT

const canvasContext = getCanvasContext(measurerCanvas)

canvasContext.strokeRect(0, 0, MEASURER_WIDTH, MEASURER_HEIGHT)
    
canvasContext.beginPath()
canvasContext.moveTo(0 + (MEASURER_WIDTH / 2), 0)
canvasContext.lineTo(
  0 + (MEASURER_WIDTH / 2),
  0 + MEASURER_HEIGHT,
)
canvasContext.stroke()

canvasContext.beginPath()
canvasContext.moveTo(
  0 + (MEASURER_WIDTH / 2),
  0 + (MEASURER_HEIGHT / 2),
)
canvasContext.lineTo(
  0 + MEASURER_WIDTH,
  0 + (MEASURER_HEIGHT / 2),
)
canvasContext.stroke()