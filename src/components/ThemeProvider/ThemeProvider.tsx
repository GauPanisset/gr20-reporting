import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { useIsTouchable } from 'hooks/useIsTouchable'

import defaultTheme from './theme.json'

type ThemeProviderProps = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isTouchable = useIsTouchable()

  const theme = React.useMemo(
    () => ({ ...defaultTheme, isTouchable }),
    [isTouchable]
  )

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}

export default ThemeProvider
