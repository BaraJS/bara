import xs, { Stream } from 'xstream'

import { createEmitterHook } from './emitter'
import { getBaraName } from './helpers/string'

import {
  BaraAction,
  BaraCallbackActionConfig,
  BaraNormalActionConfig,
} from './model/action'
import { AppStream } from './model/app'
import { BaraConditionConfig } from './model/condition'
import {
  BaraEmitter,
  BaraEmitterConfig,
  BaraEmitterMap,
  BaraEmitterPayload,
  BaraEmitterSetup,
} from './model/emitter'
import { BaraEvent, EventType } from './model/event'
import { BaraStreamConfig, BaraStreamSetup } from './model/stream'
import {
  BaraTriggerConfig,
  BaraTriggerSetup,
  TriggerEntityType,
} from './model/trigger'

import { useCallbackActionHook, useNormalActionHook } from './hooks/use-action'
import { useConditionHook } from './hooks/use-condition'
import { useCustomEventHook, useEventHook } from './hooks/use-event'
import { useStreamHook } from './hooks/use-stream'
import { useTriggerHook } from './hooks/use-trigger'

const bara = (() => {
  // Main App Stream, get merged with other stream at register step.
  let appStream: AppStream<any> = xs.never()
  let emitStream: AppStream<any> = xs.never()

  // Handle hook Stream registry
  const streamRegistry: any[] = []
  let streamRegistryIndex = 0

  // Handle hook Trigger registry
  const triggerRegistry: any[] = []
  let triggerRegistryIndex = 0
  const triggerConfig: Array<BaraTriggerConfig<any>> = []
  let triggerConfigIndex = 0

  // Handle Emitter registry
  const emitterRegistry: any[] = []
  let emitterRegistryIndex = 0
  const emitterMap: BaraEmitterMap = {} // Use JS Object for fast access via key

  return {
    register(app: () => void) {
      app()
      return { appStream, emitterMap, streamRegistry, triggerRegistry }
    },
    addDebugListener(whichStream: string, callback: (...args: any[]) => void) {
      const listener = {
        next: (value: any) => {
          callback(value)
        },
      }
      if (whichStream === 'app') {
        appStream.setDebugListener(listener)
      } else {
        const stream = streamRegistry.find(s => s.name === whichStream)
        if (stream) {
          stream._$.setDebugListener(listener)
        } else {
          throw new Error(
            `[Bara Debugger] Not found any stream registered with name ${whichStream}. You can specify stream 'app' for all stream event.`,
          )
        }
      }
    },
    useStream<T>(streamSetup: BaraStreamSetup<T>) {
      let stream
      let duplicateIndex = -1
      if (!streamRegistry[streamRegistryIndex]) {
        const newStream = useStreamHook(streamSetup, streamRegistryIndex) as any
        // Check stream dupplicated
        duplicateIndex = streamRegistry.findIndex(
          s => s && s.name === newStream.name,
        )
        stream =
          duplicateIndex > -1 ? streamRegistry[duplicateIndex] : newStream
      } else {
        stream = streamRegistry[streamRegistryIndex]
      }

      if (duplicateIndex === -1) {
        streamRegistry[streamRegistryIndex] = stream

        // Merge new stream to the main app stream to make global stream
        appStream = xs.merge(appStream, streamRegistry[streamRegistryIndex]
          ._$ as AppStream<any>)

        streamRegistryIndex = streamRegistryIndex + 1
      }

      return streamRegistry[
        duplicateIndex > -1 ? duplicateIndex : streamRegistryIndex - 1
      ]
    },
    useTrigger<T>(setup: BaraTriggerSetup<T>) {
      const config: BaraTriggerConfig<T> = {
        name: getBaraName(triggerConfigIndex),
        event: null,
      }

      // Setup trigger config
      triggerConfig[triggerConfigIndex] =
        triggerConfig[triggerConfigIndex] || config
      const {
        event: eventSetup,
        condition: conditionSetup,
        action: actionSetup,
      } = setup() // Execute user defined trigger setup function which will assign to the current triggerConfig

      // Done the setup by skip to the next trigger
      triggerConfigIndex += 1

      // Setup real trigger
      triggerRegistry[triggerRegistryIndex] =
        triggerRegistry[triggerRegistryIndex] ||
        (useTriggerHook(config, triggerRegistryIndex) as any)
      const currentTrigger = triggerRegistry[triggerRegistryIndex]

      // Attach BaraEvent, BaraCondition, BaraAction with current BaraTrigger
      const event = currentTrigger.attach(TriggerEntityType.EVENT, eventSetup, [
        appStream,
      ])
      const condition = currentTrigger.attach(
        TriggerEntityType.CONDITION,
        conditionSetup,
        [],
      )
      const action = currentTrigger.attach(
        TriggerEntityType.ACTION,
        actionSetup,
        [event, condition],
      ) // TODO replace event with condition or add condition too

      // Done trigger registering step and skip to next useTrigger function
      triggerRegistryIndex = triggerRegistryIndex + 1

      return currentTrigger
    },
    useEvent<T>(eventType: EventType) {
      const currentTriggerConfig = triggerConfig[triggerConfigIndex]
      if (!currentTriggerConfig) {
        throw new Error(
          `No trigger is registering at this time. 'useEvent' can only being used in a Bara Trigger.`,
        )
      }
      const eventSetup = useEventHook<T>(currentTriggerConfig, eventType)
      return eventSetup
    },
    useCustomEvent<T>(
      eventType: EventType,
      customFilter: (...args: any[]) => boolean,
    ) {
      const currentTriggerConfig = triggerConfig[triggerConfigIndex]
      if (!currentTriggerConfig) {
        throw new Error(
          `No trigger is registering at this time. 'useEvent' can only being used in a Bara Trigger.`,
        )
      }
      const eventSetup = useCustomEventHook<T>(
        currentTriggerConfig,
        eventType,
        customFilter,
      )
      return eventSetup
    },
    useCondition<T>(config: BaraConditionConfig<T>) {
      const conditionSetup = useConditionHook<T>(config)
      return conditionSetup
    },
    useAction<T>(callback: BaraNormalActionConfig<T>) {
      const actionSetup = useNormalActionHook(callback)
      return actionSetup
    },
    createEmitter<T>(setup: BaraEmitterSetup<T>) {
      emitterRegistry[emitterRegistryIndex] =
        emitterRegistry[emitterRegistryIndex] ||
        createEmitterHook(setup, emitterRegistryIndex)

      // Merge new stream to the main app stream to make global stream
      emitStream = xs.merge(emitStream, emitterRegistry[emitterRegistryIndex]
        ._$ as AppStream<any>)

      // Assign emitter function to emitterMap for fast access
      const emitFuncsArray = emitterRegistry[emitterRegistryIndex].emitFuncs
      for (const emitFuncs of emitFuncsArray) {
        const [eventType, emitFunc] = emitFuncs
        emitterMap[eventType] = emitFunc
      }

      emitterRegistryIndex += 1

      return emitterRegistry[emitterRegistryIndex - 1]
    },
    useEmitter<T>(eventType: EventType) {
      if (eventType() in emitterMap) {
        return emitterMap[eventType()]
      }
      return null
    },
  }
})()

const {
  addDebugListener,
  register,
  useStream,
  useTrigger,
  useEvent,
  useCustomEvent,
  useAction,
  useCondition,
  useEmitter,
  createEmitter,
} = bara

export {
  addDebugListener,
  register,
  useStream,
  useTrigger,
  useEvent,
  useCustomEvent,
  useAction,
  useCondition,
  useEmitter,
  createEmitter,
}
