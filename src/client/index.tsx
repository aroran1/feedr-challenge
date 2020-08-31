import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';
import App from './App';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';

ReactDOM.render(
  <Provider menuStore={RootStore.menuStore} previewStore={RootStore.previewStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);