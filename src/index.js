import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import Faker from 'faker';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import cableMiddleware from './middleware/cableMiddleware';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants/index';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import * as serviceWorker from './serviceWorker';
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk, cableMiddleware()))
)


ReactDOM.render(
    <Provider store={store}>
    <ActionCableProvider url={API_WS_ROOT}>
      <App />
      </ActionCableProvider>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
