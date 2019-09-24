import { combineReducers } from "redux";
import { productReducer, shopReducer } from "app/redux/reducers/product";
import { userReducer } from "app/redux/reducers/user";

export default combineReducers({
    user: userReducer,
    shop: shopReducer,
    product: productReducer
});
