import styled from 'styled-components'

const Wrapper = styled.div<ProgressBarProps>`
  position: relative;

  height: 8px;
  width: 100%;

  background: transparent;
  border: 2px solid ${({ theme }) => theme.palette.background};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: ${({ value }) => value}%;

    background-color: ${({ theme }) => theme.palette.primary};
    border-bottom-right-radius: ${({ value }) => (value === 100 ? 0 : 8)}px;
  }
`

type ProgressBarProps = {
  value: number
}

/**
 * Component displaying a progress bar.
 */
const ProgressBar = ({ value, ...props }: ProgressBarProps) => {
  return <Wrapper value={value} {...props} />
}

export default ProgressBar
