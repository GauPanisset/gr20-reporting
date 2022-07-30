import React from 'react'

type GameState = {
  activeWaypoint: number | null
}

type GameStateActions = {
  enterWaypoint: (arg: number) => void
  leaveWaypoint: () => void
}

type GameContextProps = GameState & GameStateActions

type GameProviderProps = {
  children: React.ReactNode
}

const initialGameState: GameContextProps = {
  activeWaypoint: null,
  enterWaypoint: () => {},
  leaveWaypoint: () => {},
}

export const GameContext =
  React.createContext<GameContextProps>(initialGameState)
export const useGameContext = () => React.useContext(GameContext)

/**
 * Main game controller.
 * It contains the global states of the game.
 */
const GameProvider = ({ children }: GameProviderProps) => {
  /**
   * Id of the active waypoint.
   * A waypoint is active when the player is close enough to it.
   */
  const [activeWaypoint, setActiveWaypoint] =
    React.useState<GameState['activeWaypoint']>(null)

  const gameContext = React.useMemo(
    () => ({
      activeWaypoint,
      enterWaypoint: (waypointId: number) => setActiveWaypoint(waypointId),
      leaveWaypoint: () => setActiveWaypoint(null),
    }),
    [activeWaypoint]
  )

  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  )
}

export default GameProvider
