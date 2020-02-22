import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './context/AppProvider'
import App from './App';

require('dotenv').config()

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)