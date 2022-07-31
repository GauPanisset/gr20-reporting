import styled, { keyframes } from 'styled-components'

import { PointProps } from '../pointProps'

const RADIUS = 4

const ripple = keyframes`
  0% {
    r: ${RADIUS};
    opacity: 1;
  }
  50% {
    r: ${2.5 * RADIUS};
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const Background = styled.circle`
  animation: 2s ${ripple} infinite ease-in-out;
`

const ShadowedCircle = styled.circle`
  fill: ${({ theme }) => theme.palette.primary};
  filter: drop-shadow(0px 0px 1px ${({ theme }) => theme.palette.background});
`

/**
 * Component displaying a point with a ripple effect and a specific style.
 */
const RipplePoint = ({ x, y }: PointProps) => {
  return (
    <>
      <Background cx={x} cy={y} z={0} r={RADIUS} fill="white" stroke="white" />
      <ShadowedCircle cx={x} cy={y} z={0} r={RADIUS} stroke="white" />
    </>
  )
}

export default RipplePoint
