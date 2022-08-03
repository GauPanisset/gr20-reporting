import Note from 'components/Note'
import { WaypointType } from 'enums'

import { useWaypoint } from '../../useWaypoint'
import { WaypointProps } from '../../waypointProps'

/**
 * Waypoint component attached to the 'note' waypoint.
 * It displays a simple dot on the map and a note when the player reaches it.
 */
const NoteWaypoint = ({ isActive = false, waypoint, x, y }: WaypointProps) => {
  if (waypoint.type !== WaypointType.Note)
    throw new Error(
      `'waypoint' props of NoteWaypoint should be of type ${WaypointType.Note}`
    )

  const { isCompleted, handleComplete } = useWaypoint({
    isActive,
    waypointId: waypoint.id,
  })

  return (
    <>
      <circle cx={x} cy={y} r={2} fill="white" />
      {isActive && !isCompleted && (
        <Note onClose={handleComplete} texts={waypoint.texts} />
      )}
    </>
  )
}

export default NoteWaypoint
