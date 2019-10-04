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

const socketUpdateCart = (cart, { action, product }) => {
    const newCart = [...cart];
    if (newCart.length === 0) {
        return newCart;
    }
    const productIndex = newCart.findIndex(item => {
        return item.productId._id === product._id;
    });
    if (productIndex > -1 && action === "update") {
        newCart[productIndex] = {
            ...newCart[productIndex],
            productId: { ...product }
        };
    }

    if (productIndex > -1 && action === "delete") {
        newCart.splice(productIndex, 1);
    }

    return newCart;
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
        case USER.ADD_ORDER: {
            return {
                ...state,
                loading: false,
                orders: [...state.orders, payload]
            };
        }
        case USER.SOCKET_UPDATE_CART: {
            return {
                ...state,
                cart: socketUpdateCart(state.cart, payload)
            };
        }
        default:
            return state;
    }
};
