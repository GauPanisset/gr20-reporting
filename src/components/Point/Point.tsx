import { Vector2 } from 'types'

type PointProps = Vector2 & {
  /**
   * Fill color of the point
   */
  color?: string
  /**
   * Height of the viewBox surrounding the point
   */
  height: number
  /**
   * Width of the viewBox surrounding the point
   */
  width: number
}

/**
 * Component displaying a point.
 */
const Point = ({ color = 'white', height, width, x, y }: PointProps) => {
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <circle cx={x} cy={y} r={4} fill={color} />
    </svg>
  )
}

export default Point
