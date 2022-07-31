import React from 'react'

import { Vector2 } from 'types'

type useScrollProps = {
  max?: number
  min?: number
  speed?: number
}

/**
 * Hook implementing the scroll logic.
 * It sets up the 'wheel' event listener and keep track of the scroll value.
 */
export const useScroll = ({
  max = 100,
  min = 0,
  speed = 1,
}: useScrollProps) => {
  const mousePositionOnClick = React.useRef<Vector2 | null>(null)
  const [scrollValue, setScrollValue] = React.useState<number>(min)

  /**
   * It updates the scrollValue based on a `delta` number representing how the user scroll.
   */
  const updateScrollValue = React.useCallback(
    (delta: number) => {
      if (delta > 0)
        setScrollValue((prevScrollValue) =>
          Math.max(min, Math.min(prevScrollValue + speed, max))
        )
    },
    [max, min, speed]
  )

  /**
   * Effect setting up the mouse wheel listener, which retrieve `delta` value
   * used to update the scroll value.
   */
  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY
      updateScrollValue(delta)
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [updateScrollValue])

  /**
   * Effect setting up the touch listeners, which retrieve `delta` value
   * used to update the scroll value.
   */
  React.useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0]
      mousePositionOnClick.current = { x: clientX, y: clientY }
    }
    const handleTouchMove = (event: TouchEvent) => {
      const { clientY } = event.touches[0]

      if (mousePositionOnClick.current) {
        const delta = (mousePositionOnClick.current.y - clientY) * 2
        updateScrollValue(delta)
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [updateScrollValue])

  return { scrollValue }
}
