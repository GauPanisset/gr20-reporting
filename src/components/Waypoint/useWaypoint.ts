import React from 'react'

import { useGameContext } from 'components/GameProvider'

import { WaypointProps } from './waypointProps'

type UseWaypointProps = Partial<WaypointProps> & {
  onEnter?: () => void
  onLeave?: () => void
  waypointId: number
}

/**
 * Hook implementing the waypoint logic, i.e. what happen on enter, on leave, on complete, ...
 */
export const useWaypoint = ({
  isActive,
  onEnter = () => {},
  onLeave = () => {},
  waypointId,
}: UseWaypointProps) => {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false)

  const { enterWaypoint, leaveWaypoint } = useGameContext()

  React.useEffect(() => {
    if (!isCompleted && isActive) {
      enterWaypoint(waypointId)
      onEnter()
      return () => {
        onLeave()
        leaveWaypoint()
      }
    }
  }, [
    isCompleted,
    enterWaypoint,
    isActive,
    leaveWaypoint,
    onEnter,
    onLeave,
    waypointId,
  ])

  return { isCompleted, handleComplete: () => setIsCompleted(true) }
}
