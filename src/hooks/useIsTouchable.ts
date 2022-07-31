import React from 'react'

/**
 * Hook checking if an event `touchstart` has ever been triggered.
 * This is used to detect if the user's device has a touch screen.
 *
 * The method is not 100% accurate. See the following article:
 * https://www.stucox.com/blog/you-cant-detect-a-touchscreen/
 */
export const useIsTouchable = () => {
  const [hasTouch, setHasTouch] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!hasTouch) {
      const handleTouch = () => setHasTouch(true)

      window.addEventListener('touchstart', handleTouch)
      return () => window.removeEventListener('touchstart', handleTouch)
    }
  }, [hasTouch])

  return hasTouch
}
