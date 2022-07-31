import GameProvider from 'components/GameProvider'
import InfoLayer from 'components/InfoLayer'
import Layout from 'components/Layout'
import Map from 'components/Map'
import ThemeProvider from 'components/ThemeProvider'

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <GameProvider>
          <Map />
          <InfoLayer />
        </GameProvider>
      </Layout>
    </ThemeProvider>
  )
}

export default App
