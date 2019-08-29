/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import reducers from 'app/redux/reducers';
import routes from 'app/routes/client';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const deserialize = serializedJavascript =>
    eval('(' + serializedJavascript + ')');

const store = createStore(
    reducers,
    deserialize(window.INITIAL_STATE),
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>,
    document.querySelector('#app')
);
