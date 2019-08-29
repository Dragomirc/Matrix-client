import { PRODUCT } from "app/redux/constants";

const initialState = {
    products: [],
    error: null,
    loading: false
};

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PRODUCT.REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCT.GET_SUCCESS:
            return {
                ...state,
                products: [...payload],
                loading: true
            };
        case PRODUCT.CREATE_SUCCESS:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: true
            };
        case PRODUCT.FAIL: {
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

export default productReducer;
