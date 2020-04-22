import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useAsync = (action) => {
  const dispatch = useDispatch()
  const { name, func } = action

  const newFunc = useCallback((...args) => dispatch(func(...args)), [])
  //@ts-ignore
  const error = useSelector(
    //@ts-ignore
    (state) => state.error[name] && state.error[name].error,
  )
  const loading = useSelector(
    //@ts-ignore
    (state) => state.loading[name],
  )
  const success = useMemo(() => loading === false && error === false, [
    loading,
    error,
  ])
  return [newFunc, loading, error, success]
}

export default useAsync
