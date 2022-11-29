import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store, { persistor } from './models';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import './styles/global.common.less';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </Router>,
  document.getElementById('root')
);
