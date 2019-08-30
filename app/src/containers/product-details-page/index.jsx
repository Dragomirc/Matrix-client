import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getProduct } from "app/redux/actions/product";
import { Container, Spinner, Row, Button } from "reactstrap";

class ProductDetailsPage extends Component {
    static fetchData({ store, query }) {
        const { productId } = query;
        return store.dispatch(getProduct(productId));
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
        const { product, loading } = this.props;
        let productDetailsView = <Spinner />;

        if (!loading && product) {
            productDetailsView = (
                <>
                    <Row>{product.title}</Row>
                    <Row>
                        <img src={product.imageUrl} alt="product" />
                    </Row>
                    <Row>{product.price}</Row>
                    <Row>{product.description}</Row>
                    <Row>
                        <Button>Add to Cart</Button>
                    </Row>
                </>
            );
        }
        return <Container>{productDetailsView}</Container>;
    }
}

const mapStateToProps = ({ product }) => ({
    product: product.details,
    loading: product.loading
});

export default connect(
    mapStateToProps,
    { getProductConnect: getProduct }
)(withRouter(ProductDetailsPage));

ProductDetailsPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    match: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired
};

ProductDetailsPage.defaultProps = {
    product: null
};
