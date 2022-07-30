import styled from 'styled-components'

export const infoLayerId = 'info-layer'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
`

/**
 * Layer displaying some info.
 * It is placed on top of the map.
 */
const InfoLayer = () => {
  return <Wrapper id={infoLayerId} />
}

export default InfoLayer
