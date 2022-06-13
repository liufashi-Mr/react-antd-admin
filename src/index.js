import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './models';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.common.less';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
