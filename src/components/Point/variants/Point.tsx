import { PointProps } from '../pointProps'

/**
 * Component displaying a point.
 */
const Point = ({ color = 'white', x, y }: PointProps) => {
  return <circle cx={x} cy={y} r={4} fill={color} />
}

export default Point
