import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import AppProvider from './context/AppProvider'
import App from './App';
import Honeybadger from 'honeybadger-js'
import ErrorBoundary from '@honeybadger-io/react'
require('dotenv').config()

const config = {
    apiKey: '5b2050a8',
    environment: 'production',
}
const honeybadger = Honeybadger.configure(config)

ReactDOM.render(
    <AppProvider>
        <Router>
            <ErrorBoundary honeybadger={honeybadger}>
            <App />
            </ErrorBoundary>
        </Router>
    </AppProvider>,
    document.getElementById('root')
)