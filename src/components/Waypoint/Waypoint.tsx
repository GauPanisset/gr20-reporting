import { WaypointType } from 'enums'

import NoteWaypoint from './variants/NoteWaypoint'
import RefugeWaypoint from './variants/RefugeWaypoint'
import { WaypointProps } from './waypointProps'

/**
 * Component displaying the right waypoint component based on its type.
 */
const Waypoint = ({ waypoint, ...props }: WaypointProps) => {
  if (waypoint.type === WaypointType.Note)
    return <NoteWaypoint waypoint={waypoint} {...props} />
  if (waypoint.type === WaypointType.Refuge)
    return <RefugeWaypoint waypoint={waypoint} {...props} />

  throw new Error(
    `Unknown waypoint type: \n${JSON.stringify(waypoint, null, 2)}`
  )
}

export default Waypoint
