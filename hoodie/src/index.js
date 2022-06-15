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

axios.defaults.withCredentials = true;
//import configureStore from './Store';

//const store = createStore(rootReducer);
//const persistor = persistStore(store);

const createStoreWithMiddleWare = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStoreWidthMiddleware(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
