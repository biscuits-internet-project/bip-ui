import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useAsync = (action) => {
  const dispatch = useDispatch()
  const { name, func } = action
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
  console.log('error', error, 'loading', loading, 'success', success)

  const newFunc = (...args) => dispatch(func(...args))
  return [newFunc, loading, error, success]
}

export default useAsync
