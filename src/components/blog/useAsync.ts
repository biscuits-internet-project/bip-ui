import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorState } from '../../stores/error/types'
import { LoadingState } from '../../stores/loading/types'

const useAsync = (action) => {
  const dispatch = useDispatch()
  const { name, func } = action

  const newFunc = useCallback((...args) => dispatch(func(...args)), [])
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
  return [newFunc, loading, error, success]
}

export default useAsync
