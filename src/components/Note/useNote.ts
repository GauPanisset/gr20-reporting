import React from 'react'

import { useScroll } from 'hooks/useScroll'

import { NoteProps } from './noteProps'

type useNoteProps = NoteProps & {}

/**
 * Hook implementing the Note logic.
 * It handles text display and player control on the Note.
 */
export const useNote = ({ onClose, texts }: useNoteProps) => {
  /**
   * Index of the current text in the `texts` array.
   */
  const [textIndex, setTextIndex] = React.useState<number>(0)
  const [isTextCompleted, setIsTextCompleted] = React.useState<boolean>(
    texts.length === 0
  )

  /**
   * Value of the progress bar.
   * When the bar is full, the player can continue to the next waypoint.
   */
  const { scrollValue } = useScroll({ max: 100, min: 0, speed: 0.5 })

  /**
   * Callback function triggered when the Note should be closed.
   */
  const handleClose = React.useCallback(() => {
    if (texts.length > textIndex + 1) {
      setIsTextCompleted(false)
      setTextIndex((prevTextIndex) => prevTextIndex + 1)
    } else onClose()
  }, [onClose, textIndex, texts.length])

  /**
   * Trigger the `handleClose` callback when the progress bar (controlled by player scroll)
   * is full.
   */
  React.useEffect(() => {
    if (scrollValue === 100) handleClose()
  }, [scrollValue, handleClose])

  /**
   * Effect setting up the mouse down listener.
   * The player can click to shortcut the text display animation
   * and continue to next text or waypoint.
   */
  React.useEffect(() => {
    const handleClick = () => {
      if (isTextCompleted) handleClose()
      else setIsTextCompleted(true)
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [handleClose, isTextCompleted])

  /**
   * Set the `isTextCompleted` to `true` when the text is full displayed.
   */
  const handleTextFinish = React.useCallback(() => {
    setIsTextCompleted(true)
  }, [])

  return {
    character: texts.length ? texts[textIndex].character : null,
    handleTextFinish,
    isTextCompleted,
    lines: texts.length ? texts[textIndex].lines : null,
    scrollValue,
  }
}
