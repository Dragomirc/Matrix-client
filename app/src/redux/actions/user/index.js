/* eslint-disable import/prefer-default-export */
import { USER } from "app/redux/constants";
import UserService from "app/services/api/user";

export const signup = user => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.signup(user)
        .then(() => {
            dispatch({ type: USER.SIGNUP_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: USER.FETCH_FAIL, payload: err.message });
        });
};

export const login = user => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.login(user)
        .then(res => {
            dispatch({ type: USER.LOGIN_SUCCESS, payload: res });
        })
        .catch(err => {
            dispatch({ type: USER.FETCH_FAIL, payload: err.message });
        });
};

export const logout = () => dispatch => {
    dispatch({
        type: USER.LOGIN_SUCCESS,
        payload: { userId: null, userName: null, admin: false }
    });
    UserService.logout();
};

export const getUserDetails = token => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.getUserDetails(token)
        .then(res => {
            dispatch({ type: USER.LOGIN_SUCCESS, payload: res });
        })
        .catch(err => {
            dispatch({ type: USER.FETCH_FAIL, payload: err.message });
        });
};

export const addToCart = productId => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.addToCart(productId)
        .then(res => {
            dispatch({
                type: USER.UPDATE_CART,
                payload: res.cart
            });
        })
        .catch(err => {
            dispatch({ type: USER.FETCH_FAIL, payload: err.message });
        });
};

export const deleteCartItem = productId => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.deleteCartItem(productId)
        .then(res => {
            dispatch({ type: USER.UPDATE_CART, payload: res.cart });
        })
        .catch(err => {
            dispatch({ type: USER.FETCH_FAIL, payload: err.message });
        });
};

export const socketUpdateCart = payload => {
    return {
        type: USER.SOCKET_UPDATE_CART,
        payload
    };
};

export const placeOrder = deliveryDetails => dispatch => {
    dispatch({ type: USER.FETCH_REQUEST });
    return UserService.placeOrder(deliveryDetails).then(res => {
        dispatch({
            type: USER.UPDATE_CART,
            payload: []
        });
        dispatch({
            type: USER.ADD_ORDER,
            payload: res.order
        });
    });
};
