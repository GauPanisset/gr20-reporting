import GameProvider from 'components/GameProvider'
import InfoLayer from 'components/InfoLayer'
import Layout from 'components/Layout'
import Map from 'components/Map'

const App = () => {
  return (
    <Layout>
      <GameProvider>
        <Map />
        <InfoLayer />
      </GameProvider>
    </Layout>
  )
}

export default App
