import { Action } from 'redux'
import { LoadingState } from './types'

const loadingReducer = (state: LoadingState = {}, action: Action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|FULFILLED|REJECTED|CLEAR)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  if (requestState === 'CLEAR') {
    const newState = { ...state }
    delete newState[requestName]
    return newState
  }
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  }
}

export default loadingReducer
