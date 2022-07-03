import { gpx } from '@tmcw/togeojson'
import { FeatureCollection, Position } from 'geojson'

import { Vector2 } from 'types'
import { projectLatLon } from 'utils/projectLatLon'

/**
 * Parse the gpx coordinates into a `Vector2`.
 * @param coordinate gpx representation of the coordinate
 */
const parseCoordinate = (coordinate: Position): Vector2 => {
  const [lon, lat] = coordinate
  const { x, y } = projectLatLon(lat, lon)

  return { x, y }
}

/**
 * Retrieve the coordinates contained in a .gpx file.
 * @param fileUrl url of the gpx file
 */
export const gpxToCoordinates = async (fileUrl: string): Promise<Vector2[]> => {
  const response = await fetch(fileUrl)
  const file = await response.blob()
  const gpxData = await file.text()

  const parsedGpxData: FeatureCollection = gpx(
    new DOMParser().parseFromString(gpxData, 'text/xml')
  )

  return parsedGpxData.features
    .map((feature) => {
      if (feature.geometry.type === 'LineString') {
        return feature.geometry.coordinates.map(parseCoordinate)
      } else if (feature.geometry.type === 'MultiLineString') {
        return feature.geometry.coordinates.flat().map(parseCoordinate)
      }
      throw new Error(`Unsupported Geometry type: '${feature.geometry.type}'`)
    })
    .flat()
    .filter(Boolean) as Vector2[]
}
