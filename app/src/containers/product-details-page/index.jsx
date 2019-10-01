import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct } from "app/redux/actions/product";
import { Container, Spinner, Row, Button } from "reactstrap";
import styles from "./styles.scss";

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
                    <Row className="justify-content-center">
                        <h2>{product.title}</h2>
                    </Row>
                    <Row className="justify-content-center">
                        <img
                            className={styles.image}
                            src={`https://matrix-client-bucket.s3.eu-west-2.amazonaws.com/${product.imageUrl}`}
                            alt="product"
                        />
                    </Row>
                    <Row className="justify-content-center">
                        {`${product.price} $`}
                    </Row>
                    <Row className="justify-content-center">
                        {product.description}
                    </Row>
                    <Row className="justify-content-center">
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
)(ProductDetailsPage);

ProductDetailsPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    match: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired
};

ProductDetailsPage.defaultProps = {
    product: null
};
