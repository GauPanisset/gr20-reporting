import React from 'react'

import { useScroll } from 'hooks/useScroll'

import { NoteProps } from './noteProps'

type Character = {
  text: string
  delay: number
}

type useNoteProps = NoteProps & {}

/**
 * Hook implementing the Note logic.
 * It handles text display and player control on the Note.
 */
export const useNote = ({ onClose, lines }: useNoteProps) => {
  const [isTextCompleted, setIsTextCompleted] = React.useState<boolean>(false)

  /**
   * Value of the progress bar.
   * When the bar is full, the player can continue to the next waypoint.
   */
  const { scrollValue } = useScroll({ max: 100, min: 0, speed: 0.5 })

  /**
   * Array of characters with their delay in milliseconds before being displayed.
   */
  const characters = React.useMemo<Character[]>(() => {
    let totalDelay = 0
    return lines
      .map((line, index) => {
        if (index < lines.length - 1) line.text += ' '
        return line.text.split('').map((character) => {
          totalDelay += line.speed

          return { delay: totalDelay, text: character }
        })
      })
      .flat()
  }, [lines])

  /**
   * Trigger the `onClose` callback when the progress bar (controlled by player scroll)
   * is full.
   */
  React.useEffect(() => {
    if (scrollValue === 100) onClose()
  }, [scrollValue, onClose])

  /**
   * Set the `isTextCompleted` to `true` when the text is full displayed.
   */
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTextCompleted(true)
    }, characters[characters.length - 1].delay)

    return () => clearTimeout(timeout)
  }, [characters])

  /**
   * Effect setting up the mouse down listener.
   * The player can click to shortcut the text display animation
   * and continue to next waypoint.
   */
  React.useEffect(() => {
    const handleClick = () => {
      if (isTextCompleted) onClose()
      setIsTextCompleted(true)
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [isTextCompleted, onClose])

  return { characters, isTextCompleted, scrollValue }
}
