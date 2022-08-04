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
  image?: string
  texts: NoteText[]
  type: WaypointType.Note
}

export type Waypoint = WaypointRefuge | WaypointNote
