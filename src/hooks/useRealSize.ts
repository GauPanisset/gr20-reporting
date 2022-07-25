import React from 'react'

const measureHeight = () => {
  return (
    (document.documentElement && document.documentElement.clientHeight) ||
    window.innerHeight
  )
}

const measureWidth = () => {
  return (
    (document.documentElement && document.documentElement.clientWidth) ||
    window.innerWidth
  )
}

/**
 * Returns the height and the width of an element.
 * If no elementId is given, it returns the size of the browser window.
 *
 * The hook computes the size at each `resize` event.
 * @param elementId css id of a DOM element.
 */
export const useRealSize = (elementId?: string) => {
  /**
   * Measured height of the element
   */
  const [height, setHeight] = React.useState(measureHeight())
  /**
   * Measured width of the element
   */
  const [width, setWidth] = React.useState(measureWidth())

  React.useEffect(() => {
    const setMeasured = () => {
      const element = elementId ? document.getElementById(elementId) : null
      setHeight(element ? element.clientHeight : measureHeight())
      setWidth(element ? element.clientWidth : measureWidth())
    }

    setMeasured()

    window.addEventListener('resize', setMeasured)
    return () => window.removeEventListener('resize', setMeasured)
  }, [elementId])

  return { height, width }
}
