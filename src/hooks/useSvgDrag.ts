import React from 'react'

import { Vector2 } from 'types'

type UseSvgDragProps = {
  /**
   * Main svg wrapper used to set boundaries to the draggable zone.
   */
  wrapperRef: React.RefObject<SVGSVGElement>
  /**
   * Callback triggered when the user drags the svg.
   */
  onDrag: (dx: number, dy: number) => void
  /**
   * Callback triggered when the user stops dragging the svg.
   */
  onDragEnd: () => void
}

/**
 * Hook exposing the handlers needed to drag and drop an svg element.
 */
export const useSvgDrag = ({
  wrapperRef,
  onDrag,
  onDragEnd,
}: UseSvgDragProps) => {
  const mousePositionOnClick = React.useRef<Vector2 | null>(null)

  /**
   * Retrieve the mouse position in the wrapper.
   */
  const getMousePosition = React.useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      const defaultPosition = { x: 0, y: 0 }

      if (wrapperRef.current) {
        const CTM = wrapperRef.current.getScreenCTM()
        if (CTM === null) return defaultPosition

        const x = event.clientX
        const y = event.clientY

        return {
          x: (x - CTM.e) / CTM.a,
          y: (y - CTM.f) / CTM.d,
        }
      } else return defaultPosition
    },
    [wrapperRef]
  )

  /**
   * Callback triggered when the user starts dragging the svg.
   */
  const handleStartDrag = (event: React.MouseEvent<SVGSVGElement>) => {
    mousePositionOnClick.current = getMousePosition(event)
  }

  /**
   * Callback triggered when the user drags the svg.
   */
  const handleDrag = (event: React.MouseEvent<SVGSVGElement>) => {
    if (mousePositionOnClick.current !== null) {
      event.preventDefault()

      const mousePosition = getMousePosition(event)

      onDrag(
        mousePosition.x - mousePositionOnClick.current.x,
        mousePosition.y - mousePositionOnClick.current.y
      )
    }
  }

  /**
   * Callback triggered when the user stops dragging the svg.
   */
  const handleEndDrag = (event: React.MouseEvent<SVGSVGElement>) => {
    mousePositionOnClick.current = null
    onDragEnd()
  }

  return { handleStartDrag, handleDrag, handleEndDrag }
}
