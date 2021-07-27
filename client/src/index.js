import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/Login/Login';
import reportWebVitals from './reportWebVitals';
import Signup from './components/Signup/index';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//<BrowserRouter>
//    <App />
//</BrowserRouter>,

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
