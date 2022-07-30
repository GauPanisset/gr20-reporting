import React from 'react'

import { useWaypoint } from '../../useWaypoint'
import { WaypointProps } from '../../waypointProps'

import { ReactComponent as WaypointIcon } from './Waypoint5.2.svg'

/**
 * Waypoint component attached to the 'refuge' waypoint.
 * It displays a pin showing the position of the refuge.
 *
 * TODO Work in progress
 */
const RefugeWaypoint = ({
  isActive = false,
  waypoint,
  x,
  y,
}: WaypointProps) => {
  const handleEnter = React.useCallback(() => {
    console.log('Refuge is activated')
  }, [])
  const handleLeave = React.useCallback(() => {
    console.log('Refuge is deactivated')
  }, [])

  useWaypoint({
    isActive,
    onEnter: handleEnter,
    onLeave: handleLeave,
    waypointId: waypoint.id,
  })

  return <WaypointIcon height="31" width="23" x={x - 10.5} y={y - 29} />
}

export default RefugeWaypoint
