import styled, { keyframes } from 'styled-components'

import { TextProps } from './textProps'
import { useText } from './useText'

const Wrapper = styled.div`
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

type DelayedSpanProps = {
  delay: number
}

/**
 * Component displaying an array of characters forming a text.
 * These characters can be animated to create the illusion of type-written text.
 */
const Text = ({ lines, onFinish, shouldDelay = false }: TextProps) => {
  const { characters } = useText({ lines, onFinish, shouldDelay })

  return (
    <Wrapper>
      {characters.map(({ delay, text }) => {
        if (shouldDelay)
          return (
            <DelayedSpan key={delay} delay={delay}>
              {text}
            </DelayedSpan>
          )
        return <StyledSpan key={delay}>{text}</StyledSpan>
      })}
    </Wrapper>
  )
}

export default Text
