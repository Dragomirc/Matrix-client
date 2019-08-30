import { SHOP, PRODUCT } from "app/redux/constants";
import ProductService from "app/services/api/product";

export const getProducts = () => dispatch => {
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });

    return ProductService.getProducts()
        .then(res => {
            dispatch({
                type: SHOP.GET_PRODUCTS_SUCCESS,
                payload: res
            });
        })
        .catch(err => {
            dispatch({ type: SHOP.FETCH_PRODUCTS_FAIL, payload: err.message });
        });
};

export const createProduct = product => dispatch => {
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    return ProductService.createProduct(product)
        .then(res => {
            dispatch({
                type: SHOP.CREATE_PRODUCT_SUCCESS,
                payload: res.product
            });
        })

        .catch(err => {
            dispatch({ type: SHOP.FETCH_PRODUCTS_FAIL, payload: err.message });
        });
};

export const getProduct = productId => dispatch => {
    dispatch({ type: PRODUCT.FETCH_PRODUCT_REQUEST });
    return ProductService.getProduct(productId)
        .then(res => {
            dispatch({ type: PRODUCT.GET_PRODUCT_SUCCESS, payload: res });
        })
        .catch(err => {
            dispatch({
                type: PRODUCT.FETCH_PRODUCT_FAIL,
                payload: err.message
            });
        });
};
