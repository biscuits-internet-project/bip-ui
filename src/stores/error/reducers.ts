import { ErrorState } from './types'

const errorReducer = (state: ErrorState = {}, action: any) => {
  const { type, payload } = action
  const matches = /(.*)_(REQUEST|FULFILLED|REJECTED)/.exec(type)

  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: {
      error: requestState === 'REJECTED',
      payload: requestState === 'REJECTED' ? payload : null,
    },
  }
}

export default errorReducer
