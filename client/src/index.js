import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import Yago from './yago';

ReactDOM.render(
  <React.StrictMode>
    <Yago />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
