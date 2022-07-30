import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { infoLayerId } from 'components/InfoLayer'
import ProgressBar from 'components/ProgressBar'
import { useScroll } from 'hooks/useScroll'

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 60%;

  margin: 32px auto;

  background-color: white;
  border: 2px solid var(--dark-color);
  border-radius: 0px;
  box-shadow: 8px 8px var(--light-color);
`

const StyledProgressBar = styled(ProgressBar)`
  border: unset;
  border-bottom: 2px dashed var(--dark-color);
`

const Text = styled.div`
  padding: 24px;
`

type NoteProps = {
  onClose: () => void
  text: string
}

/**
 * Component displaying a basic note on the top of the InfoLayer (through portal).
 * When the note is active, the player can scroll to close it.
 */
const Note = ({ onClose, text }: NoteProps) => {
  const { scrollValue } = useScroll({ max: 100, min: 0, speed: 0.5 })

  const infoLayerElement = document.getElementById(infoLayerId)

  React.useEffect(() => {
    if (scrollValue === 100) onClose()
  }, [scrollValue, onClose])

  return (
    infoLayerElement &&
    ReactDOM.createPortal(
      <Wrapper>
        <StyledProgressBar value={scrollValue} />
        <Text>{text}</Text>
      </Wrapper>,
      infoLayerElement
    )
  )
}

export default Note
