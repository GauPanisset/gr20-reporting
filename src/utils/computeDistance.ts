import { Vector2 } from 'types'

/**
 * Compute the distance between two points.
 * @param pointA starting point
 * @param pointB end point
 */
export const computeDistance = (pointA: Vector2, pointB: Vector2): number =>
  Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2)
