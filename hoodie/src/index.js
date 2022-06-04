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
import axios from 'axios';

axios.defaults.withCredentials = true;
//import configureStore from './Store';

//const store = createStore(rootReducer);
//const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
