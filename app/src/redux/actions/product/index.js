import { PRODUCT } from "app/redux/constants";
import ProductService from "app/services/api/product";

export const getProducts = () => dispatch => {
    dispatch({ type: PRODUCT.FETCH_REQUEST });

    return ProductService.getProducts()
        .then(res => {
            dispatch({
                type: PRODUCT.GET_SUCCESS,
                payload: res
            });
        })
        .catch(err => {
            dispatch({ type: PRODUCT.FETCH_FAIL, payload: err.message });
        });
};

export const createProduct = product => dispatch => {
    dispatch({ type: PRODUCT.FETCH_REQUEST });
    return ProductService.createProduct(product)
        .then(res => {
            dispatch({
                type: PRODUCT.CREATE_SUCCESS,
                payload: res.product
            });
        })

        .catch(err => {
            dispatch({ type: PRODUCT.FETCH_FAIL, payload: err.message });
        });
};
