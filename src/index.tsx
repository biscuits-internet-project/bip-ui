import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './context/AppProvider'
import App from './App';
import ReactGA from 'react-ga';

require('dotenv').config()

const trackingId = "UA-10444792-1";
ReactGA.initialize(trackingId);

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)