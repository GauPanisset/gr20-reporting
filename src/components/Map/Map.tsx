import styled from 'styled-components'

import Loader from 'components/Loader'
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
    isInit,
    pointCoordinate,
    wrapperRef,
    handleWheel,
    initiateRefs,
  } = useMap()

  return (
    <>
      {!isInit && <Loader />}

      <Wrapper onWheel={handleWheel} ref={wrapperRef}>
        <svg ref={initiateRefs}>
          <g>
            {isInit && (
              <svg viewBox={`0 0 ${map.width} ${map.height}`}>
                <MapBackground />
                <Polyline points={coordinates} />
                {pointCoordinate && (
                  <RipplePoint x={pointCoordinate.x} y={pointCoordinate.y} />
                )}
              </svg>
            )}
          </g>
        </svg>
      </Wrapper>
    </>
  )
}

export default Map
