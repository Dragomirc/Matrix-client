import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from 'app/redux/reducers';

export default (req) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            cookie: req.get('cookie') || ''
        }
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers,
        {},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk.withExtraArgument(axiosInstance)),
    );
    return store;
};
