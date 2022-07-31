import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import Avatar from 'components/Avatar'
import { ClickIcon } from 'components/icons'
import { infoLayerId } from 'components/InfoLayer'
import ProgressBar from 'components/ProgressBar'

import { NoteProps } from './noteProps'
import { useNote } from './useNote'

const Wrapper = styled.div`
  width: 60%;

  margin: 32px auto;

  background-color: white;
  border: 2px solid ${({ theme }) => theme.palette.background};
  border-radius: 0px;
  box-shadow: 8px 8px ${({ theme }) => theme.palette.primary};

  @media screen and (max-width: 600px) {
    width: calc(100% - 2 * 16px);
    margin: 16px;
  }
`

const StyledProgressBar = styled(ProgressBar)`
  border: unset;
  border-bottom: 2px dashed ${({ theme }) => theme.palette.background};
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
`

const Text = styled.div`
  padding: 8px 24px;

  font-weight: 600;
`

const reveal = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`

const DelayedSpan = styled.span<DelayedSpanProps>`
  animation: ${({ delay }) => delay}ms step-end ${reveal};
  opacity: 1;
`

const StyledSpan = styled.span``

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

type DelayedSpanProps = {
  delay: number
}

/**
 * Component displaying a basic note on the top of the InfoLayer (through portal).
 * When the note is active, the player can scroll to close it.
 */
const Note = ({ onClose, lines }: NoteProps) => {
  const infoLayerElement = document.getElementById(infoLayerId)

  const { characters, isTextCompleted, scrollValue } = useNote({
    onClose,
    lines,
  })

  return (
    infoLayerElement &&
    ReactDOM.createPortal(
      <Wrapper>
        <StyledProgressBar value={scrollValue} />
        <Body>
          <Avatar
            src="https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91"
            alt="Gauthier's avatar"
          />
          <Content>
            <Text>
              {characters.map(({ delay, text }) => {
                if (isTextCompleted)
                  return <StyledSpan key={delay}>{text}</StyledSpan>
                return (
                  <DelayedSpan key={delay} delay={delay}>
                    {text}
                  </DelayedSpan>
                )
              })}
            </Text>
            <Action>
              <ClickIcon height={24} width={24} />
              pour continuer
            </Action>
          </Content>
        </Body>
      </Wrapper>,
      infoLayerElement
    )
  )
}

export default Note
