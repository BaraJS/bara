import {
  createEventType,
  useAction,
  useCondition,
  useEvent,
  useTrigger,
} from '@bara/core'

import { BaraInit, ON_INITIALIZED } from './event'

export const useInitTrigger = (onInitialized: (data: BaraInit) => void) => {
  return useTrigger<BaraInit>(() => {
    const event = useEvent<BaraInit>(ON_INITIALIZED)
    const action = useAction<BaraInit>(onInitialized)
    return { event, action }
  })
}