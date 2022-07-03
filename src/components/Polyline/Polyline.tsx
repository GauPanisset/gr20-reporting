import { Vector2 } from 'types'

type PolylineProps = {
  /**
   * Stroke color of the polyline
   */
  color?: string
  /**
   * Height of the viewBox surrounding the polyline
   */
  height: number
  /**
   * List of points to draw the polyline
   */
  points: Vector2[]
  /**
   * Width of the viewBox surrounding the polyline
   */
  width: number
}

/**
 * Component displaying a svg polyline from a list of points.
 */
const Polyline = ({
  color = 'white',
  height,
  points,
  width,
}: PolylineProps) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="transparent"
        points={`${points.map(({ x, y }) => `${x}, ${y}`).join(' ')}`}
        stroke={color}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Polyline
