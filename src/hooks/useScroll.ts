import React from 'react'

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
  const [scrollValue, setScrollValue] = React.useState<number>(min)

  /**
   * Effect setting up the mouse wheel listener.
   * It updates the scrollValue when the user uses the mouse wheel.
   */
  React.useEffect(() => {
    const handleWheel = (event: any) => {
      const delta = event.deltaY

      if (delta > 0)
        setScrollValue((prevScrollValue) =>
          Math.max(min, Math.min(prevScrollValue + speed, max))
        )
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [max, min, speed])

  return { scrollValue }
}
