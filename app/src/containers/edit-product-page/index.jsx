import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { getProduct } from "app/redux/actions/product";
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

    render() {
        const { product } = this.props;
        return (
            <Container>
                <AddProduct product={product} isEditing />
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
    { getProductConnect: getProduct }
)(EditProductPage);

EditProductPage.propTypes = {
    // loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    match: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired
};

EditProductPage.defaultProps = {
    product: null
};
