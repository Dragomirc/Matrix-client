import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import {
    updateProduct,
    updateProductDetail,
    getProduct
} from "app/redux/actions/product";
import requireAuth from "app/hoc/require-auth";
import isUserAdmin from "app/hoc/is-user-admin";
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
        const {
            updateProductConnect,
            updateProductDetailConnect,
            product,
            history
        } = this.props;
        updateProductConnect(product).then(() => {
            updateProductDetailConnect("image", undefined);
            history.push("/admin-products");
        });
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
        updateProductConnect: updateProduct,
        updateProductDetailConnect: updateProductDetail
    }
)(requireAuth(isUserAdmin(EditProductPage)));

EditProductPage.propTypes = {
    updateProductConnect: PropTypes.func.isRequired,
    updateProductDetailConnect: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired
};
