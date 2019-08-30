import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import {
    createProduct,
    updateProductDetail,
    getProduct
} from "app/redux/actions/product";

import AddProduct from "app/components/add-product";

class EditProductPage extends Component {
    static fetchData({ store, query }) {
        const { productId } = query;
        if (productId) {
            return store.dispatch(getProduct(productId));
        }
        return Promise.resolve(null);
    }

    componentDidMount() {
        const { product, match, getProductConnect } = this.props;
        const oldProductId = product ? product._id : null;
        const currentProductId = match.params.productId;
        if (oldProductId !== currentProductId) {
            getProductConnect(currentProductId);
        }
    }

    onInputChange = ({ target: { value, name, files } }) => {
        const { updateProductDetailConnect } = this.props;
        if (files) {
            updateProductDetailConnect(name, files[0]);
        } else {
            updateProductDetailConnect(name, value);
        }
    };

    onSubmit = event => {
        event.preventDefault();
        const { createProductConnect, product } = this.props;
        createProductConnect(product);
    };

    render() {
        const { product } = this.props;
        return (
            <Container>
                <AddProduct
                    product={product}
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                    btnText="Edit Product"
                />
            </Container>
        );
    }
}

const mapStateToProps = ({ product }) => ({
    product: product.details,
    loading: product.loading
});

export default connect(
    mapStateToProps,
    {
        getProductConnect: getProduct,
        createProductConnect: createProduct,
        updateProductDetailConnect: updateProductDetail
    }
)(EditProductPage);

EditProductPage.propTypes = {
    createProductConnect: PropTypes.func.isRequired,
    updateProductDetailConnect: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired
};
