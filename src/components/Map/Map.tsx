import styled from 'styled-components'

import MapBackground from 'components/MapBackground'
import { RipplePoint } from 'components/Point'
import Polyline from 'components/Polyline'
import { map } from 'config'

import { useMap } from './useMap'

const Wrapper = styled.svg`
  height: 100%;
  width: 100%;
`

/**
 * Component displaying the map with the background images, hiking path and a point on the path.
 */
const Map = () => {
  const {
    coordinates,
    pointCoordinate,
    wrapperRef,
    handleWheel,
    initiateRefs,
  } = useMap()

  return (
    <>
      <Wrapper onWheel={handleWheel} ref={wrapperRef}>
        <svg ref={initiateRefs}>
          <g>
            <MapBackground />
            <Polyline
              height={map.height}
              points={coordinates}
              width={map.width}
            />
            {pointCoordinate && (
              <RipplePoint
                height={map.height}
                width={map.width}
                x={pointCoordinate.x}
                y={pointCoordinate.y}
              />
            )}
          </g>
        </svg>
      </Wrapper>
    </>
  )
}

export default Map
