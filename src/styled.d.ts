import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    isTouchable: boolean
    palette: {
      primary: string
      secondary: string
      background: string
      text: string
    }
  }
}
