import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  overflow: hidden;

  background-color: #041c32;
`

type LayoutProps = {
  children: React.ReactNode
}

/**
 * Component setting the main application layout.
 */
const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>
}

export default Layout
