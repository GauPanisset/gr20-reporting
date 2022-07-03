import styled, { keyframes } from 'styled-components'

import { PointProps } from './pointProps'

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
  filter: drop-shadow(0px 0px 1px #041c32);
`

/**
 * Component displaying a point with a ripple effect and a specific style.
 */
const RipplePoint = ({ height, width, x, y }: PointProps) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <Background cx={x} cy={y} r={RADIUS} fill="#ffffff" stroke="#ffffff" />
      <ShadowedCircle
        cx={x}
        cy={y}
        r={RADIUS}
        fill="#ECB365"
        stroke="#ffffff"
      />
    </svg>
  )
}

export default RipplePoint
