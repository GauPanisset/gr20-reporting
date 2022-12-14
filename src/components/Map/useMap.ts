import React from 'react'
import { useTheme } from 'styled-components'

import { useGameContext } from 'components/GameProvider'
import { map, scale } from 'config'
import { useRealSize } from 'hooks/useRealSize'
import { useScroll } from 'hooks/useScroll'
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
   * Screen real height and width. They are used to handle the responsiveness
   * by triggering the "center point" effects.
   * When the height or width changes, the coordinates of the first point center are reset
   * and the current point is moved to the center.
   */
  const { height: screenHeight, width: screenWidth } = useRealSize()

  const { wrapperRef, initiateRefs, move, resetTransformMatrix, zoom } =
    useSvgTransform()

  const { activeWaypoint } = useGameContext()

  /**
   * Value between 0 and 1 indicating the scroll percentage.
   * This is used to move along the path on scroll.
   */
  const { scrollValue } = useScroll({
    max: 1,
    min: 0,
    speed: activeWaypoint === null ? 1 / 2000 : 0,
  })

  const { isTouchable } = useTheme()

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
   * Initialize the map position. It move the first coordinate to the center of the screen and
   * scale up the svg.
   * The movement of the point is relative to this first position.
   */
  const initializeCenter = React.useCallback(
    (coordinate: Vector2) => {
      if (wrapperRef.current) {
        const { x, y } = convertGpxSystemToScreenSystem(coordinate)
        const { height, width } = wrapperRef.current.getBoundingClientRect()
        const horizontalOffset = isTouchable ? 0 : (width * (1 / 6)) / scale

        move(width / 2 - x + horizontalOffset, height / 2 - y)
        zoom(scale)
      }
    },
    [convertGpxSystemToScreenSystem, isTouchable, move, wrapperRef, zoom]
  )

  /**
   * Fetching data...
   */
  React.useEffect(() => {
    const fetch = async () => {
      const newCoordinates = await gpxToCoordinates(
        'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/GR20.gpx'
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
    if (firstCoordinate && !isInit) {
      initializeCenter(firstCoordinate)
      setIsInit(true)
    }
  }, [initializeCenter, firstCoordinate, isInit])

  /**
   * Reset the position of the first coordinates when the screen size changes.
   */
  React.useEffect(() => {
    if (firstCoordinate) {
      resetTransformMatrix()
      initializeCenter(firstCoordinate)
    }
  }, [
    initializeCenter,
    firstCoordinate,
    resetTransformMatrix,
    screenHeight,
    screenWidth,
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
   * Move the map when the simplifiedCoordinate or screen size changes.
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
    screenHeight,
    screenWidth,
    simplifiedCoordinate,
    wrapperRef,
  ])

  return {
    coordinates,
    isInit,
    pointCoordinate,
    wrapperRef,
    initiateRefs,
  }
}
