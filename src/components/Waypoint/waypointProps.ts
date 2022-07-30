import { Vector2, Waypoint } from 'types'

export type WaypointProps = Vector2 & {
  isActive?: boolean
  waypoint: Waypoint
}
