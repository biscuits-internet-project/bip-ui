import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import AppProvider from './context/AppProvider'
import App from './App';

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)