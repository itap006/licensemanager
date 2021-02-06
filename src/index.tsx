import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './redux/store';
import { url } from 'appConstants';
import axios from 'axios';

axios.defaults.baseURL = url;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
