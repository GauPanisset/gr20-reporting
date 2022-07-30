import { NoteText } from 'types'

export type NoteProps = {
  onClose: () => void
  lines: NoteText[]
}
