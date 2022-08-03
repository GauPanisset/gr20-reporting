import { Line } from 'types'

export type TextProps = {
  /**
   * Text lines to display in the text.
   * A line may not end by a `\n`. It is just a chunk of text.
   */
  lines: Line[]
  /**
   * Function triggered when the text is fully displayed.
   */
  onFinish: () => void
  /**
   * Whether the text should be animated or not.
   */
  shouldDelay?: boolean
}
