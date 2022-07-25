/**
 * Component displaying the map background created from 2 overlapping svg images.
 */
const MapBackground = () => (
  <>
    <image
      href="https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/contours-100-background-only.png"
      x="0"
      y="0"
      height="100%"
      width="100%"
      style={{ filter: 'brightness(2)', opacity: 0.2 }}
    />
    <image
      href="https://gaupanisset-corsica.s3.eu-west-3.amazonaws.com/contours-100-yellow.png"
      x="0"
      y="0"
      height="100%"
      width="100%"
      style={{ opacity: 0.4 }}
    />
  </>
)

export default MapBackground
