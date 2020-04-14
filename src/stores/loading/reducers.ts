import { Action } from 'redux'
import { LoadingState } from './types'

const loadingReducer = (state: LoadingState = {}, action: Action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|FULFILLED|REJECTED)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}

export default loadingReducer
