import styled from 'styled-components'

import Loader from 'components/Loader'
import MapBackground from 'components/MapBackground'
import { RipplePoint } from 'components/Point'
import Polyline from 'components/Polyline'
import Waypoint from 'components/Waypoint'
import { map } from 'config'
import { waypoints } from 'config/waypoints'
import { WaypointType } from 'enums'
import { computeDistance } from 'utils/computeDistance'

import { useMap } from './useMap'

const Wrapper = styled.svg`
  height: 100%;
  width: 100%;
`

/**
 * Component displaying the map with the background images, hiking path and a point on the path.
 */
const Map = () => {
  const { coordinates, isInit, pointCoordinate, wrapperRef, initiateRefs } =
    useMap()

  return (
    <>
      {!isInit && <Loader />}

      <Wrapper ref={wrapperRef}>
        <svg ref={initiateRefs}>
          <g>
            {isInit && (
              <svg viewBox={`0 0 ${map.width} ${map.height}`}>
                <MapBackground />
                <Polyline points={coordinates} />
                {pointCoordinate &&
                  waypoints.reduce(
                    (points, waypoint) => {
                      const distance =
                        pointCoordinate !== null
                          ? computeDistance(
                              pointCoordinate,
                              waypoint.coordinate
                            )
                          : null
                      const isActive = distance !== null && distance < 5

                      const WaypointComponent = (
                        <Waypoint
                          key={waypoint.id}
                          isActive={isActive}
                          waypoint={waypoint}
                          x={waypoint.coordinate.x}
                          y={waypoint.coordinate.y}
                        />
                      )

                      /**
                       * Place the RipplePoint between the waypoint with a lower y and those with a higher y.
                       * This creates the illusion of 3D with the RipplePoint moving from behind to the front of each waypoint.
                       */
                      if (
                        waypoint.coordinate.y > pointCoordinate.y &&
                        waypoint.type !== WaypointType.Note
                      ) {
                        points.push(WaypointComponent)
                      } else {
                        points.splice(0, 0, WaypointComponent)
                      }
                      return points
                    },
                    [
                      <RipplePoint
                        key="ripple-point"
                        x={pointCoordinate.x}
                        y={pointCoordinate.y}
                      />,
                    ]
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
