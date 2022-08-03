import React from 'react'

import { TextProps } from './textProps'

type Character = {
  text: string
  delay: number
}

type UseTextProps = TextProps

/**
 * Hook creating the `characters` array.
 * It set the right delay to the right characters according to line speed.
 */
export const useText = ({ lines, onFinish, shouldDelay }: UseTextProps) => {
  /**
   * Array of characters with their delay in milliseconds before being displayed.
   */
  const characters = React.useMemo<Character[]>(() => {
    let totalDelay = 0
    return lines.flatMap((line, index) => {
      if (index < lines.length - 1) line.text += ' '
      return line.text.split('').map((character) => {
        totalDelay += line.speed

        return { delay: totalDelay, text: character }
      })
    })
  }, [lines])

  /**
   * Call `onFinish` when the text is full displayed.
   * Only triggered if the characters were animated by `shouldDelay`.
   */
  React.useEffect(() => {
    if (shouldDelay) {
      const timeout = setTimeout(() => {
        onFinish()
      }, characters[characters.length - 1].delay)

      return () => clearTimeout(timeout)
    }
  }, [characters, onFinish, shouldDelay])

  return { characters }
}
