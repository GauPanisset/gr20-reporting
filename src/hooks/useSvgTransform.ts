import React from 'react'

/**
 * 2D Transform matrix:
 *
 *  x_new     a c e     x_prev     ax_prev + cy_prev + e
 *  y_new  =  b d f  *  y_prev  =  bx_prev + dy_prev + f
 *    1       0 0 1       1                  1
 */
type TransformMatrix = {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

const initialTransformMatrix: TransformMatrix = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
}

/**
 * Hook exposing functions to manipulate the transform matrix attached to an svg element.
 */
export const useSvgTransform = () => {
  /**
   * Transform matrix stored between two clicks.
   */
  const transformMatrix = React.useRef<TransformMatrix>(initialTransformMatrix)

  const groupRef = React.useRef<SVGGElement>()
  const svgRef = React.useRef<SVGSVGElement>()
  const wrapperRef = React.useRef<SVGSVGElement>(null)

  /**
   * Function initializing the refs. It should set as `ref` callback on the svg element on which
   * the transform matrix will be applied.
   *
   * It initializes svgRef, groupRef and adds the transform matrix.
   */
  const initiateRefs = React.useCallback((ref: SVGSVGElement) => {
    if (!svgRef.current) {
      svgRef.current = ref
    }
    const groups = svgRef.current.getElementsByTagName('g')
    if (groups.length === 0)
      throw new Error(
        `The DraggableSvg children need to be wrapped in a group svg element (<g>).`
      )
    groupRef.current = groups[0]

    /**
     * Make sure the first SVGTransform of the group is the matrix.
     */
    const groupTransforms = groupRef.current.transform.baseVal
    if (
      groupTransforms.length === 0 ||
      groupTransforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_MATRIX
    ) {
      const newTransform = svgRef.current.createSVGTransform()
      const newMatrix = svgRef.current.createSVGMatrix()
      const { a, b, c, d, e, f } = newMatrix
      transformMatrix.current = { a, b, c, d, e, f }

      newTransform.setMatrix(newMatrix)
      groupTransforms.insertItemBefore(newTransform, 0)
    }
  }, [])

  /**
   * Reset the transform matrix applied on the svg.
   */
  const resetTransformMatrix = React.useCallback(() => {
    if (groupRef.current) {
      const currentMatrix = groupRef.current.transform.baseVal.getItem(0).matrix
      currentMatrix.a = 1
      currentMatrix.b = 0
      currentMatrix.c = 0
      currentMatrix.d = 1
      currentMatrix.e = 0
      currentMatrix.f = 0

      transformMatrix.current = initialTransformMatrix
    }
  }, [])

  /**
   * Save the current transform matrix applied on the svg in the appropriate ref.
   */
  const saveTransformMatrix = React.useCallback(() => {
    if (groupRef.current) {
      const { a, b, c, d, e, f } =
        groupRef.current.transform.baseVal.getItem(0).matrix
      transformMatrix.current = { a, b, c, d, e, f }
    }
  }, [])

  /**
   * Move the svg.
   */
  const move = React.useCallback((dx: number, dy: number) => {
    if (groupRef.current) {
      const currentMatrix = groupRef.current.transform.baseVal.getItem(0).matrix
      currentMatrix.e = transformMatrix.current.e + dx
      currentMatrix.f = transformMatrix.current.f + dy
    }
  }, [])

  /**
   * Re-scale the svg.
   */
  const zoom = React.useCallback(
    (scale: number) => {
      if (groupRef.current && wrapperRef.current) {
        const currentMatrix =
          groupRef.current.transform.baseVal.getItem(0).matrix
        currentMatrix.a *= scale
        currentMatrix.b *= scale
        currentMatrix.c *= scale
        currentMatrix.d *= scale
        currentMatrix.e *= scale
        currentMatrix.f *= scale

        const { height, width } = wrapperRef.current.getBoundingClientRect()

        currentMatrix.e += (1 - scale) * (width / 2)
        currentMatrix.f += (1 - scale) * (height / 2)

        saveTransformMatrix()
      }
    },
    [saveTransformMatrix]
  )

  return {
    wrapperRef,
    initiateRefs,
    move,
    resetTransformMatrix,
    saveTransformMatrix,
    zoom,
  }
}
