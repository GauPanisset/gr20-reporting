import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import Avatar from 'components/Avatar'
import { ClickIcon } from 'components/icons'
import { infoLayerId } from 'components/InfoLayer'
import ProgressBar from 'components/ProgressBar'
import Text from 'components/Text'

import { NoteProps } from './noteProps'
import { useNote } from './useNote'

const Wrapper = styled.div`
  width: 60%;

  margin: 32px auto;

  background-color: white;
  border: 2px solid ${({ theme }) => theme.palette.background};
  border-radius: 0px;
  box-shadow: 8px 8px ${({ theme }) => theme.palette.primary};

  text-align: center;

  @media screen and (max-width: 600px) {
    width: calc(100% - 2 * 16px);
    margin: 16px;
  }
`

const StyledProgressBar = styled(ProgressBar)`
  border: unset;
  border-bottom: 2px dashed ${({ theme }) => theme.palette.background};
`

const Image = styled.img`
  max-height: 60vh;
  max-width: calc(100% - 2 * 8px);

  margin: 32px 8px 24px 8px;

  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.palette.background};

  @media screen and (max-width: 600px) {
    margin: 16px 8px 8px 8px;
  }
`

const Body = styled.div`
  display: flex;

  margin-top: 8px; ;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;

  text-align: start;
`
const opacityYoyo = keyframes`
  0% { opacity: 0.4 }
  50% { opacity: 0.7 }
  100% { opacity: 0.4 }
`

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;

  height: 24px;

  padding: 0 8px 8px 0;

  text-align: end;

  animation: 1.5s ease-in-out infinite ${opacityYoyo};
  opacity: 0.5;
`

/**
 * Component displaying a basic note on the top of the InfoLayer (through portal).
 * When the note is active, the player can scroll to close it.
 */
const Note = ({ disablePortal = false, image, onClose, texts }: NoteProps) => {
  const infoLayerElement = document.getElementById(infoLayerId)

  const { character, handleTextFinish, isTextCompleted, lines, scrollValue } =
    useNote({
      onClose,
      texts,
    })

  const note = (
    <Wrapper>
      <StyledProgressBar value={scrollValue} />
      {image && <Image src={image} alt="" />}
      <Body>
        {character && lines && (
          <Avatar src={character.avatar} alt={`Avatar de ${character.name}`} />
        )}
        <Content>
          {lines && (
            <Text
              lines={lines}
              onFinish={handleTextFinish}
              shouldDelay={!isTextCompleted}
            />
          )}
          <Action>
            <ClickIcon height={24} width={24} />
          </Action>
        </Content>
      </Body>
    </Wrapper>
  )

  return disablePortal && infoLayerElement
    ? ReactDOM.createPortal(note, infoLayerElement)
    : note
}

export default Note
