export const SET_FILTER = 'SET_FILTER'

export const setFilter = ({ namespace, filterInfo }) => ({
  type: SET_FILTER,
  payload: {
    namespace,
    filterInfo,
  },
})
