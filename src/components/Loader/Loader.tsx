import styled from 'styled-components'

import { ReactComponent as Corsica } from './corsica-simple.svg'

const StyledCorsica = styled(Corsica)`
  height: 100%;
  width: 100%;
`

const Loader = () => {
  return <StyledCorsica />
}

export default Loader
