import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorState } from '../../stores/error/types'
import { LoadingState } from '../../stores/loading/types'

const useAsync = (action) => {
  const dispatch = useDispatch()
  const { name, func } = action

  let newFunc

  if (dispatch && func) {
    newFunc = (...args) => dispatch(func(...args))
  }
  const error: Boolean = useSelector(
    (state: ErrorState) => state.error[name] && state.error[name].error,
  )
  const loading: Boolean = useSelector(
    (state: LoadingState) => state.loading[name],
  )
  const success: Boolean = useMemo(() => loading === false && error === false, [
    loading,
    error,
  ])
  useEffect(() => {
    if (success === true) {
      dispatch({ type: `${name}_CLEAR` })
    }
  }, [success])
  return [newFunc, loading, error, success]
}

export default useAsync
