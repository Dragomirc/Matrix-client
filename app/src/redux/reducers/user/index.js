/* eslint-disable import/prefer-default-export */
import { USER } from "app/redux/constants";

const userInitialState = {
    userId: null,
    userName: null,
    cart: [],
    orders: [],
    admin: false,
    error: null,
    loading: false
};

export const userReducer = (state = userInitialState, { type, payload }) => {
    switch (type) {
        case USER.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER.FETCH_FAILED:
            return {
                ...state,
                userId: null,
                userName: null,
                loading: false,
                error: payload
            };
        case USER.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case USER.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: payload.cart,
                orders: payload.orders,
                userId: payload.userId,
                admin: payload.admin,
                userName: payload.userName
            };
        case USER.UPDATE_CART: {
            return {
                ...state,
                loading: false,
                cart: [...payload]
            };
        }
        default:
            return state;
    }
};
