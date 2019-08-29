/* eslint-disable */
import { PRODUCT } from 'app/redux/constants';
import ProductService from 'app/services/api/product';

export const getProducts = () => dispatch => {
    dispatch({ type: PRODUCT.GET_REQUEST });

    return ProductService.getProducts()
        .then(res => {
            dispatch({
                type: PRODUCT.GET_SUCCESS,
                payload: res
            });
        })
        .catch(err => {
            dispatch({ type: PRODUCT.GET_FAIL, payload: err.message });
        });
};
