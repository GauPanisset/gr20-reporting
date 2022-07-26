import { Vector2 } from 'types'

type PolylineProps = {
  /**
   * Stroke color of the polyline
   */
  color?: string
  /**
   * List of points to draw the polyline
   */
  points: Vector2[]
}

/**
 * Component displaying a svg polyline from a list of points.
 */
const Polyline = ({ color = 'white', points }: PolylineProps) => {
  return (
    <polyline
      fill="transparent"
      points={`${points.map(({ x, y }) => `${x}, ${y}`).join(' ')}`}
      stroke={color}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  )
}

export default Polyline
