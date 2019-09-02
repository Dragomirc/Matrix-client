import { combineReducers } from "redux";
import { productReducer, shopReducer } from "app/redux/reducers/product";
import { authReducer } from "app/redux/reducers/auth";

export default combineReducers({
    auth: authReducer,
    shop: shopReducer,
    product: productReducer
});
