import { PointProps } from './pointProps'

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
