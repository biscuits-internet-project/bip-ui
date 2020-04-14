import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppProvider from './context/AppProvider'
import App from './App'
import Honeybadger from 'honeybadger-js'
import ErrorBoundary from '@honeybadger-io/react'
import store from './config/redux'

require('dotenv').config()

const config = {
  apiKey: '5b2050a8',
  environment: 'production',
}
const honeybadger = Honeybadger.configure(config)

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Router>
        <ErrorBoundary honeybadger={honeybadger}>
          <App />
        </ErrorBoundary>
      </Router>
    </AppProvider>
  </Provider>,
  document.getElementById('root'),
)
