import { NoteText } from 'types'
/**
 * Map background image size. This also defines the dimensions of the gpx system.
 */
export const map = {
  height: 3318,
  width: 1541,
}

/**
 * Scale apply to the map on initialization.
 */
export const scale = 8

/**
 * Character display speed of note text.
 */
export const textSpeed: Record<string, NoteText['speed']> = {
  pause: 500,
  slow: 120,
  normal: 50,
  fast: 10,
}
