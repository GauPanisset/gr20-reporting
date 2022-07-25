import { Vector2 } from 'types'

type System = {
  height: number
  width: number
}

/**
 * Convert the coordinate of a point from the gpx system to the screen system.
 *
 * The systems are represented as rectangle with a height and width. We do not need more information because
 * the gpx system is supposed centered (horizontally and vertically) and bounded in the screen system.
 * @param coordinate coordinate of the point to convert
 * @param gpxSystem system use to define the coordinate of a point in the gpx
 * @param screenSystem system use to define the coordinate of a point in the whole screen
 */
export const gpxSystemToScreenSystem = (
  coordinate: Vector2,
  gpxSystem: System,
  screenSystem: System
): Vector2 => {
  const { height: gpxHeight, width: gpxWidth } = gpxSystem
  const { height, width } = screenSystem

  const ratio = gpxHeight / gpxWidth

  const isHorizontal = ratio * width > height
  if (isHorizontal) {
    const alpha = height / gpxHeight
    const offset = (width - alpha * gpxWidth) / 2

    return { x: coordinate.x * alpha + offset, y: coordinate.y * alpha }
  } else {
    const alpha = width / gpxWidth
    const offset = (height - alpha * gpxHeight) / 2

    return { x: coordinate.x * alpha, y: coordinate.y * alpha + offset }
  }
}
