import { WaypointType } from 'enums'
import { NoteText, Vector2 } from 'types'

type WaypointBase = {
  coordinate: Vector2
  id: number
  type: WaypointType
}

type WaypointRefuge = WaypointBase & {
  type: WaypointType.Refuge
}

type WaypointNote = WaypointBase & {
  type: WaypointType.Note
  image?: string
  texts: NoteText[]
}

export type Waypoint = WaypointRefuge | WaypointNote
