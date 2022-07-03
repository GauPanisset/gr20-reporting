import React from 'react'

import { map, scale, speed } from 'config'
import { useSvgTransform } from 'hooks/useSvgTransform'
import { gpxSystemToScreenSystem } from 'utils/gpxSystemToScreenSystem'
import { interpolateCurve } from 'utils/interpolateCurve'
import { simplifyPath } from 'utils/simplifyPath'
import { gpxToCoordinates } from 'utils/gpxToCoordinates'
import { Vector2 } from 'types'

export const useMap = () => {
  /**
   * Coordinates of the points from the gpx file.
   */
  const [coordinates, setCoordinates] = React.useState<Vector2[]>([])
  /**
   * Whether the component is initialized or not.
   */
  const [isInit, setIsInit] = React.useState<boolean>(false)
  /**
   * Value between 0 and 1 indicating the scroll percentage.
   * This is used to move along the path on scroll.
   */
  const [scrollValue, setScrollValue] = React.useState<number>(0)

  const { wrapperRef, initiateRefs, move, zoom } = useSvgTransform()

  /**
   * Convert the coordinates coming from the gpx file to screen coordinates.
   * This is especially used to move the map based on the movement on the path.
   */
  const convertGpxSystemToScreenSystem = React.useCallback(
    (coordinate: Vector2) => {
      if (wrapperRef.current) {
        const gpxSystem = { height: map.height, width: map.width }

        const { height, width } = wrapperRef.current.getBoundingClientRect()
        const screenSystem = { height, width }

        return gpxSystemToScreenSystem(coordinate, gpxSystem, screenSystem)
      }

      return { x: 0, y: 0 }
    },
    [wrapperRef]
  )

  /**
   * Fetching data...
   */
  React.useEffect(() => {
    const fetch = async () => {
      const newCoordinates = await gpxToCoordinates(
        'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/corse-gr20-complet-16-etapes-officiels-nord-sud.gpx'
      )

      setCoordinates(newCoordinates)
    }

    fetch()
  }, [])

  /**
   * Simplified coordinates (see `interpolateCurve` and `simplifyPath` functions)
   * use to move the map more smoothly than with the real coordinates.
   */
  const simplifiedCoordinates = React.useMemo(
    () =>
      coordinates.length ? interpolateCurve(simplifyPath(coordinates)) : [],
    [coordinates]
  )

  const firstCoordinate = coordinates.length && coordinates[0]

  /**
   * Initialization...
   * It moves the map to place the first coordinate to the center of the screen and scale it to the appropriate size.
   */
  React.useEffect(() => {
    if (wrapperRef.current && firstCoordinate && !isInit) {
      const firstPoint = convertGpxSystemToScreenSystem(firstCoordinate)
      const { height, width } = wrapperRef.current.getBoundingClientRect()
      move(width / 2 - firstPoint.x, height / 2 - firstPoint.y)
      zoom(scale)

      setIsInit(true)
    }
  }, [
    convertGpxSystemToScreenSystem,
    firstCoordinate,
    isInit,
    move,
    wrapperRef,
    zoom,
  ])

  /**
   * Coordinate of the current point of the real path based on the scroll value.
   */
  const pointCoordinate = React.useMemo(
    () =>
      coordinates.length
        ? coordinates[Math.floor(coordinates.length * scrollValue)]
        : null,
    [coordinates, scrollValue]
  )

  /**
   * Coordinate of the current point of the simplified path based on the scroll value.
   */
  const simplifiedCoordinate = React.useMemo(() => {
    return simplifiedCoordinates.length
      ? simplifiedCoordinates[
          Math.floor(simplifiedCoordinates.length * scrollValue)
        ]
      : null
  }, [simplifiedCoordinates, scrollValue])

  /**
   * Move the map when the simplifiedCoordinate changes.
   * Therefore this effect is triggered after every scrollValue changes.
   */
  React.useEffect(() => {
    if (firstCoordinate && simplifiedCoordinate) {
      const { x, y } = convertGpxSystemToScreenSystem(simplifiedCoordinate)
      const { x: firstX, y: firstY } =
        convertGpxSystemToScreenSystem(firstCoordinate)
      move((firstX - x) * scale, (firstY - y) * scale)
    }
  }, [
    convertGpxSystemToScreenSystem,
    firstCoordinate,
    move,
    simplifiedCoordinate,
    wrapperRef,
  ])

  /**
   * Callback function triggered when the user rotates his mouse wheel.
   * It updates the scrollValue.
   * @param event wheel event
   */
  const handleWheel = (event: React.WheelEvent) => {
    const delta = event.deltaY

    setScrollValue((prevScrollValue) =>
      Math.max(0, Math.min(prevScrollValue + Math.sign(delta) * speed, 1))
    )
  }

  return {
    coordinates,
    isInit,
    pointCoordinate,
    wrapperRef,
    handleWheel,
    initiateRefs,
  }
}
