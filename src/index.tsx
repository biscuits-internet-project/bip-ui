import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './context/AppProvider'
import App from './App';

require('dotenv').config()

console.log(process.env)

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)