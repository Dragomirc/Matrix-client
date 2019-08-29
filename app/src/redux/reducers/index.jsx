import { combineReducers } from "redux";
import productReducer from "app/redux/reducers/product";

export default combineReducers({ shop: productReducer });
