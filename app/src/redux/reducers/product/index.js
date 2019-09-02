/* eslint-disable import/prefer-default-export */
import { SHOP, PRODUCT } from "app/redux/constants";

const shopInitialState = {
    products: [],
    error: null,
    loading: false
};

const updateProduct = (products, updatedProduct) => {
    const updatedProducts = [...products];
    const index = updatedProducts.findIndex(product => {
        return updatedProduct._id === product._id;
    });
    if (index !== -1) {
        updatedProducts[index] = updatedProduct;
    }
    return updatedProducts;
};
export const shopReducer = (state = shopInitialState, { type, payload }) => {
    switch (type) {
        case SHOP.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SHOP.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: [...payload],
                loading: false
            };
        case SHOP.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: false
            };
        case SHOP.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: updateProduct(state.products, payload),
                loading: false
            };
        case SHOP.FETCH_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                error: payload
            };
        }
        default:
            return state;
    }
};

const productInitialState = {
    details: {},
    loading: false,
    error: null
};
export const productReducer = (
    state = productInitialState,
    { type, payload }
) => {
    switch (type) {
        case PRODUCT.FETCH_PRODUCT_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case PRODUCT.GET_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                details: payload
            };
        }
        case PRODUCT.FETCH_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: payload
            };
        }
        case PRODUCT.UPDATE_PRODUCT_DETAIL: {
            return {
                ...state,
                details: { ...state.details, [payload.property]: payload.value }
            };
        }
        default:
            return state;
    }
};
