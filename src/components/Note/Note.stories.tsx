import { ComponentStory, ComponentMeta } from '@storybook/react'

import { textSpeed } from 'config'

import Note from '.'

const NoteMeta: ComponentMeta<typeof Note> = {
  title: 'Note',
  component: Note,
}

const NoteTemplate: ComponentStory<typeof Note> = (props) => (
  <Note disablePortal={true} {...props} />
)

export const NoteWithText = NoteTemplate.bind({})
NoteWithText.args = {
  texts: [
    {
      character: {
        avatar: '',
        name: 'Gauthier',
      },
      lines: [
        {
          text: 'Une petite Story du composant Note...',
          speed: textSpeed.normal,
        },
        { text: 'Euuuuh... ', speed: textSpeed.slow },
        { text: "C'est génial en fait !!", speed: textSpeed.fast },
      ],
    },
  ],
}
NoteWithText.storyName = 'with text only'

export const NoteWithAvatar = NoteTemplate.bind({})
NoteWithAvatar.args = {
  texts: [
    {
      character: {
        avatar:
          'https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91',
        name: 'Gauthier',
      },
      lines: [
        {
          text: 'Story du composant Note avec un avatar représentant le personnage qui parle.',
          speed: textSpeed.fast,
        },
      ],
    },
  ],
}
NoteWithAvatar.storyName = 'with avatar'

export const NoteDialog = NoteTemplate.bind({})
NoteDialog.args = {
  texts: [
    {
      character: {
        avatar:
          'https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91',
        name: 'Gauthier',
      },
      lines: [
        {
          text: "Comment vas-tu aujourd'hui ?",
          speed: textSpeed.fast,
        },
      ],
    },
    {
      character: {
        avatar:
          'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/avatar.png',
        name: 'Laetitia',
      },
      lines: [
        {
          text: 'Ouuuui',
          speed: textSpeed.slow,
        },
        {
          text: 'ça va, et toi ?',
          speed: textSpeed.fast,
        },
      ],
    },
    {
      character: {
        avatar:
          'https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91',
        name: 'Gauthier',
      },
      lines: [
        {
          text: 'Plutôt bien, merci.',
          speed: textSpeed.fast,
        },
      ],
    },
  ],
}
NoteDialog.storyName = 'with dialog'

export const NoteWithImage = NoteTemplate.bind({})
NoteWithImage.args = {
  image: 'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/IMG_1009.jpg',
  texts: [],
}
NoteWithImage.storyName = 'with image only'

export const NoteWithImageAndText = NoteTemplate.bind({})
NoteWithImageAndText.args = {
  image: 'https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/IMG_1009.jpg',
  texts: [
    {
      character: {
        avatar:
          'https://secure.gravatar.com/avatar/ccac36b35a890c8ac8cff3f83fb94d91',
        name: 'Gauthier',
      },
      lines: [
        {
          text: "Regarde comme c'est beau !",
          speed: textSpeed.fast,
        },
      ],
    },
  ],
}
NoteWithImageAndText.storyName = 'with image and text'

export default NoteMeta
