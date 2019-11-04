import { Formula } from './types'

/**
 * Execute multiple actions side-by-side in a parallel
 * @param actions
 */
export const side = (...actions: Formula[]) => async (
  payload: any,
  ...rest: any[]
) => {
  const all = actions.map(action => action(payload, ...rest))
  return await Promise.all(all)
}
