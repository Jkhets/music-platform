import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './redux/store';  // Redux store (to be set up later)
import App from './App';


ReactDOM.render(
  // <Provider store={store}>

      <App />

  // </Provider>,
  ,document.getElementById('root')
);
