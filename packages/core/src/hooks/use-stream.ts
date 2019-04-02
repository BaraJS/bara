import xs from 'xstream'
import { EventType } from '../model/event'
import {
  BaraStream,
  BaraStreamConfig,
  BaraStreamPayload,
  SetupCallbacks,
} from '../model/stream'

function validateStreamConfig<T>(config: BaraStreamConfig<T>) {
  if (!('setup' in config)) {
    throw new Error(`Please specify "setup" function in a Bara Stream`)
  }
}

export function useStreamHook<T>(config: BaraStreamConfig<T>): BaraStream<T> {
  validateStreamConfig(config)
  // TODO return a callback function to merge this stream with appStream
  const _$ = xs.create<BaraStreamPayload<T>>({
    // Start callback will be invoked only at least one listener subscribed
    start: listener => {
      const emit = (eventType: EventType, payload: T) => {
        listener.next({ eventType, payload })
      }
      config.setup({ emit })
    },
    stop: () => {
      // TODO implement the stream clean up callback API
    },
  })
  return { _$, config }
}
