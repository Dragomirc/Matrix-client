import { combineReducers } from "redux";
import { productReducer, shopReducer } from "app/redux/reducers/product";

export default combineReducers({ shop: shopReducer, product: productReducer });
