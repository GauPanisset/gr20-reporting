import { ExtendedVector2, Vector2 } from 'types'

/**
 * Compute the perpendicular distance between a point and a line.
 * @param point point
 * @param line line defined by two points
 */
const perpendicularDistance = (point: Vector2, line: [Vector2, Vector2]) => {
  const alpha = (line[1].y - line[0].y) / (line[1].x - line[0].x)
  const beta = line[0].y - alpha * line[0].x

  return (
    Math.abs(alpha * point.x - point.y + beta) / Math.sqrt(alpha * alpha + 1)
  )
}

/**
 * Implementation of the Douglas-Peucker algorithm.
 * It removes some points of a path that are not necessary to keep the main shape of it.
 * The preserved points will be `ExtendedVector2` to keep the number of points removed in the simplified segment.
 *
 * See more: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm#Pseudocode
 * @param coordinates path to simplify
 * @param epsilon limit distance from the path at which the points are removed
 */
const douglasPeucker = (
  coordinates: ExtendedVector2[],
  epsilon: number
): ExtendedVector2[] => {
  const segment: [ExtendedVector2, ExtendedVector2] = [
    coordinates[0],
    coordinates[coordinates.length - 1],
  ]

  let maxDistance = 0
  let maxIndex = 0

  for (let index = 1; index < coordinates.length - 1; index++) {
    const distance = perpendicularDistance(coordinates[index], segment)
    if (distance > maxDistance) {
      maxIndex = index
      maxDistance = distance
    }
  }

  if (maxDistance > epsilon) {
    const leftPath = douglasPeucker(coordinates.slice(0, maxIndex + 1), epsilon)
    // Remove the last point since it will be in the right path.
    leftPath.pop()
    const rightPath = douglasPeucker(coordinates.slice(maxIndex), epsilon)

    return [...leftPath, ...rightPath]
  } else {
    /**
     * Keep the number of removed points.
     */
    segment[1].removedCoordinates = coordinates.length - 2
    return segment
  }
}

export const simplifyPath = (coordinates: Vector2[]): ExtendedVector2[] =>
  douglasPeucker(
    coordinates.map((coordinate) => ({ ...coordinate, removedCoordinates: 0 })),
    10
  )
