import { createStore as _createStore, Store, applyMiddleware } from 'redux'
import rootReducer, { RootState } from '../stores/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const createStore = (initialState?: Partial<RootState>) => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  return _createStore(rootReducer, initialState, composedEnhancers) as Store<
    RootState
  >
}

const store = createStore() as Store<RootState>
export default store
