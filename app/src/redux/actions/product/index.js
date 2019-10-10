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

const getImageFileNames = async fileList => {
    const preSignedUrlPromises = [];
    for (let i = 0; i < fileList.length; i++) {
        const fileName = fileList[i].name;
        preSignedUrlPromises.push(ImageUploadService.getPresignedUrl(fileName));
    }
    const s3ResObjs = await Promise.all(preSignedUrlPromises);
    const fileNamesArr = s3ResObjs.map((item, index) => {
        ImageUploadService.uploadImageToS3(item.preSignedUrl, fileList[index]);
        return item.fileName;
    });
    return fileNamesArr;
};
export const createProduct = product => async dispatch => {
    const prod = { ...product };
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    try {
        const fileNamesArr = await getImageFileNames(product.image);
        prod.imageUrls = fileNamesArr;
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

export const socketCreateProduct = product => {
    return {
        type: SHOP.CREATE_PRODUCT_SUCCESS,
        payload: product
    };
};

export const updateProduct = product => async dispatch => {
    const prod = { ...product };
    dispatch({ type: SHOP.FETCH_PRODUCTS_REQUEST });
    try {
        const res = await ProductService.updateProduct(prod);
        dispatch({
            type: SHOP.UPDATE_PRODUCT_SUCCESS,
            payload: res.product
        });
    } catch (err) {
        dispatch({
            type: SHOP.FETCH_PRODUCTS_FAIL,
            payload: err.message
        });
    }
};

export const socketUpdateProduct = product => {
    return {
        type: SHOP.UPDATE_PRODUCT_SUCCESS,
        payload: product
    };
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

export const socketDeleteProduct = product => {
    return {
        type: SHOP.DELETE_PRODUCT_SUCCESS,
        payload: product
    };
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

export const updateProductDetail = (property, value) => async dispatch => {
    try {
        let newProperty = property;
        let newValue = value;
        if (property === "image") {
            const fileNamesArr = await getImageFileNames(value);
            newProperty = "imageUrls";
            newValue = fileNamesArr;
        }
        dispatch({
            type: PRODUCT.UPDATE_PRODUCT_DETAIL,
            payload: { property: newProperty, value: newValue }
        });
    } catch (err) {
        dispatch({
            type: SHOP.FETCH_PRODUCTS_FAIL,
            payload: err.message
        });
    }
};
