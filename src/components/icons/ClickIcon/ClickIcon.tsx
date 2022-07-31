import { useTheme } from 'styled-components'

import { ReactComponent as MouseClickIcon } from './MouseClickIcon.svg'
import { ReactComponent as TouchClickIcon } from './TouchClickIcon.svg'

/**
 * Component displaying an icon which invite the user to click.
 * The icon changes if the user has a touch screen instead of a mouse.
 */
const ClickIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme()

  if (theme.isTouchable) return <TouchClickIcon {...props} />
  return <MouseClickIcon {...props} />
}

export default ClickIcon
