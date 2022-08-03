import React from 'react'
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components'

import { useIsTouchable } from 'hooks/useIsTouchable'

import defaultTheme from './theme.json'

type ThemeProviderProps = {
  children: React.ReactNode
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 16px;
    font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isTouchable = useIsTouchable()

  const theme = React.useMemo(
    () => ({ ...defaultTheme, isTouchable }),
    [isTouchable]
  )

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}

export default ThemeProvider
