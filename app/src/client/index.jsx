import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import reducers from "app/redux/reducers";
import routes from "app/routes/client";

const axiosInstance = axios.create({});
const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);
