import { geoMercator } from 'd3-geo'

import { map } from 'config'
import { Vector2 } from 'types'

/**
 * Project real latitude and longitude into the gpx system which have Vector2 coordinates.
 * We are using the Mercator projection.
 * @param latitude latitude of the point
 * @param longitude longitude of the point
 */
export const projectLatLon = (latitude: number, longitude: number): Vector2 => {
  /**
   * The value of `center`, `angle` and `scale` are manually adjusted.
   */
  const projection = geoMercator()
    .center([9.055, 42.189])
    .angle(-0.3)
    .translate([map.width / 2, map.height / 2])
    .scale(86500)

  const [x, y] = projection([longitude, latitude]) || [0, 0]

  return { x, y }
}
