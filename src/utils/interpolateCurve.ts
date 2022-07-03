import { ExtendedVector2, Vector2 } from 'types'

enum Spline {
  Uniform = 0,
  Centripetal = 0.5,
  Chordal = 1,
}

type Quadruple = [
  ExtendedVector2,
  ExtendedVector2,
  ExtendedVector2,
  ExtendedVector2
]

/**
 * Add two "arbitrary" points. One at the start and one at the end of the path in order to
 * keep the first and last real points which would have been removed by the spline algorithm otherwise.
 * @param coordinates coordinates forming the path
 */
const correctCoordinates = (
  coordinates: ExtendedVector2[]
): ExtendedVector2[] => {
  const firstPoint = {
    x: 2 * coordinates[0].x - coordinates[1].x,
    y: 2 * coordinates[0].y - coordinates[1].y,
    removedCoordinates: 0,
  }
  const lastPoint = {
    x:
      2 * coordinates[coordinates.length - 1].x -
      coordinates[coordinates.length - 2].x,
    y:
      2 * coordinates[coordinates.length - 1].y -
      coordinates[coordinates.length - 2].y,
    removedCoordinates: 0,
  }

  return [firstPoint, ...coordinates, lastPoint]
}

/**
 * Generate a list of number evenly spaced.
 * @param start first number
 * @param end last number
 * @param resolution number of numbers in the list
 */
const linearInterpolation = (
  start: number,
  end: number,
  resolution: number
): number[] => {
  const interpolated = [start]
  const interval = (end - start) / resolution

  for (let index = 1; index < resolution; index++) {
    interpolated[index] = interpolated[index - 1] + interval
  }

  return interpolated
}

/**
 * Implementation of the Catmull-Rom spline interpolation.
 * Given 4 points (`Quadruple`) it returns the points forming a curve between the 2nd and the 3rd ones.
 *
 * See more: https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline#Code_example_in_Python
 * @param segment list of 4 points
 * @param resolution number of points in the interpolated curve
 * @param splineParam see {@link Spline}
 */
const catmullRomSpline = (
  segment: Quadruple,
  resolution: number,
  splineParam: Spline = Spline.Centripetal
): Vector2[] => {
  const [point0, point1, point2, point3] = segment

  const tj = (ti: number, pi: Vector2, pj: Vector2): number => {
    const { x: xi, y: yi } = pi
    const { x: xj, y: yj } = pj
    const dx = xj - xi
    const dy = yj - yi
    const l = Math.sqrt(dx ** 2 + dy ** 2)
    return ti + l ** splineParam
  }

  const t0 = 0
  const t1 = tj(t0, point0, point1)
  const t2 = tj(t1, point1, point2)
  const t3 = tj(t2, point2, point3)

  const t = linearInterpolation(t1, t2, resolution)

  const spline: Vector2[] = []

  for (const ti of t) {
    const A1 = {
      x:
        ((t1 - ti) / (t1 - t0)) * point0.x + ((ti - t0) / (t1 - t0)) * point1.x,
      y:
        ((t1 - ti) / (t1 - t0)) * point0.y + ((ti - t0) / (t1 - t0)) * point1.y,
    }
    const A2 = {
      x:
        ((t2 - ti) / (t2 - t1)) * point1.x + ((ti - t1) / (t2 - t1)) * point2.x,
      y:
        ((t2 - ti) / (t2 - t1)) * point1.y + ((ti - t1) / (t2 - t1)) * point2.y,
    }
    const A3 = {
      x:
        ((t3 - ti) / (t3 - t2)) * point2.x + ((ti - t2) / (t3 - t2)) * point3.x,
      y:
        ((t3 - ti) / (t3 - t2)) * point2.y + ((ti - t2) / (t3 - t2)) * point3.y,
    }

    const B1 = {
      x: ((t2 - ti) / (t2 - t0)) * A1.x + ((ti - t0) / (t2 - t0)) * A2.x,
      y: ((t2 - ti) / (t2 - t0)) * A1.y + ((ti - t0) / (t2 - t0)) * A2.y,
    }
    const B2 = {
      x: ((t3 - ti) / (t3 - t1)) * A2.x + ((ti - t1) / (t3 - t1)) * A3.x,
      y: ((t3 - ti) / (t3 - t1)) * A2.y + ((ti - t1) / (t3 - t1)) * A3.y,
    }

    spline.push({
      x: ((t2 - ti) / (t2 - t1)) * B1.x + ((ti - t1) / (t2 - t1)) * B2.x,
      y: ((t2 - ti) / (t2 - t1)) * B1.y + ((ti - t1) / (t2 - t1)) * B2.y,
    })
  }

  return spline
}

/**
 * Apply the Catmull-Rom spline algorithm to create the curve that interpolate the given path.
 * Note that the resolution of the splines can be different since we want to keep the original number of points
 * between each segment in order to maintain the real movement speed.
 * @param coordinates path to interpolate
 */
export const interpolateCurve = (coordinates: ExtendedVector2[]) => {
  if (coordinates.length < 2) return coordinates

  const correctedCoordinates = correctCoordinates(coordinates)

  const segments: Quadruple[] = []
  for (let index = 0; index < correctedCoordinates.length - 3; index++) {
    segments.push([
      correctedCoordinates[index],
      correctedCoordinates[index + 1],
      correctedCoordinates[index + 2],
      correctedCoordinates[index + 3],
    ])
  }

  const splines: Vector2[][] = segments.map((segment) => {
    /**
     * We want to keep the same number of points within a segment to keep the real movement speed.
     */
    const resolution = segment[2].removedCoordinates
    return catmullRomSpline(segment, resolution)
  })

  return splines.flat()
}
