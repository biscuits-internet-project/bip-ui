import { ErrorState } from './types'

const errorReducer = (state: ErrorState = {}, action: any) => {
  const { type, payload } = action
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
    [requestName]: {
      error: requestState === 'REJECTED',
      payload: requestState === 'REJECTED' ? payload : null,
    },
  }
}

export default errorReducer
