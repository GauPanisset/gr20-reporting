import { Vector2 } from 'types'

export type PointProps = Vector2 & {
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
