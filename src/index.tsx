import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import AppProvider from './context/AppProvider'
import App from './App';

require('dotenv').config()

ReactDOM.render(
    <AppProvider>
        <Router>
            <App />
        </Router>
    </AppProvider>,
    document.getElementById('root')
)