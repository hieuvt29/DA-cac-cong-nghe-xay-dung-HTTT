import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import combineReducer from './combineReducer';
import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(rootSagas);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
