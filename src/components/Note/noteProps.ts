import { NoteText } from 'types'

export type NoteProps = {
  /**
   * Whether the Note component should be render through the portal
   * of the `InfoLayer` or not.
   */
  disablePortal?: boolean
  /**
   * Texts to display in the Note.
   * See NoteText type for more information.
   */
  texts: NoteText[]
  /**
   * Function triggered when the Note should be closed.
   */
  onClose: () => void
}
