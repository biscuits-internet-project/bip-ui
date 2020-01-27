import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';
import AppProvider from './context/AppProvider'
import App from './App';

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)