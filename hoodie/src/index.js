import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import {persistStore} from 'redux-persist';
import {persistGate} from 'redux-persist/lib/integration/react';
import {rootReducer} from './Reducers';
import reduxThunk from 'react-thunk';
import promiseMiddleware from 'react-promise';
import axios from 'axios';
import { store } from './_store';

axios.defaults.withCredentials = true;
//import configureStore from './Store';

//const store = createStore(rootReducer);
//const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
