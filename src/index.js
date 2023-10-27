import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ArrayProvider } from './ArrayContext';

ReactDOM.render(
  <React.StrictMode>
    <ArrayProvider>
      <App />
    </ArrayProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
