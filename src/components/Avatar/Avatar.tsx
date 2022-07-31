import styled from 'styled-components'

const Wrapper = styled.div`
  height: 80px;
  width: 80px;
`

type AvatarProps = {
  alt?: string
  src: string
}

/**
 * Component displaying a character avatar.
 */
const Avatar = ({ alt, src, ...props }: AvatarProps) => {
  return (
    <Wrapper {...props}>
      <img src={src} alt={alt} />
    </Wrapper>
  )
}

export default Avatar
