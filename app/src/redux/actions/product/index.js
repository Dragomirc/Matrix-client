import { SHOP, PRODUCT } from "app/redux/constants";
import ProductService from "app/services/api/product";
import ImageUploadService from "app/services/api/image-upload";

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

export const createProduct = product => async dispatch => {
    const prod = { ...product };
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    try {
        const {
            preSignedUrl,
            fileName
        } = await ImageUploadService.getPresignedUrl();
        await ImageUploadService.uploadImageToS3(preSignedUrl, prod.image);
        prod.imageUrl = fileName;
        delete prod.image;
        const res = await ProductService.createProduct(prod);
        dispatch({
            type: SHOP.CREATE_PRODUCT_SUCCESS,
            payload: res.product
        });
    } catch (err) {
        dispatch({ type: SHOP.FETCH_PRODUCTS_FAIL, payload: err.message });
    }
};

export const updateProduct = product => dispatch => {
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    return ProductService.updateProduct(product)
        .then(res => {
            dispatch({
                type: SHOP.UPDATE_PRODUCT_SUCCESS,
                payload: res.product
            });
        })
        .catch(err => {
            dispatch({
                type: SHOP.FETCH_PRODUCTS_FAIL,
                payload: err.message
            });
        });
};
export const deleteProduct = productId => dispatch => {
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    return ProductService.deleteProduct(productId)
        .then(res => {
            dispatch({
                type: SHOP.DELETE_PRODUCT_SUCCESS,
                payload: res.product
            });
        })
        .catch(err => {
            dispatch({
                type: SHOP.FETCH_PRODUCTS_FAIL,
                payload: err.message
            });
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

export const updateProductDetail = (property, value) => {
    return {
        type: PRODUCT.UPDATE_PRODUCT_DETAIL,
        payload: { property, value }
    };
};
