import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Spinner, Row, Button, Col } from "reactstrap";
import { getProduct } from "app/redux/actions/product";
import { addToCart } from "app/redux/actions/user";

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

    onAddToCartClick = () => {
        const { history, match, addToCartConnect } = this.props;
        const { productId } = match.params;
        addToCartConnect(productId).then(() => {
            history.push("/cart");
        });
    };

    render() {
        const { product, loading } = this.props;
        const images = product.imageUrls.map(url => ({
            original: `https://matrix-client-bucket.s3.eu-west-2.amazonaws.com/${url}`,
            thumbnail: `https://matrix-client-bucket.s3.eu-west-2.amazonaws.com/${url}`
        }));

        let productDetailsView = <Spinner />;

        if (!loading && product) {
            productDetailsView = (
                <>
                    <Row className="justify-content-center">
                        <h2>{product.title}</h2>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showFullscreenButton={false}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {`${product.price} $`}
                    </Row>
                    <Row className="justify-content-center">
                        {product.description}
                    </Row>
                    <Row className="justify-content-center">
                        <Button onClick={this.onAddToCartClick}>
                            Add to Cart
                        </Button>
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
const mapDispatchToProps = {
    addToCartConnect: addToCart,
    getProductConnect: getProduct
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetailsPage);

ProductDetailsPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    match: PropTypes.object.isRequired,
    getProductConnect: PropTypes.func.isRequired,
    addToCartConnect: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

ProductDetailsPage.defaultProps = {
    product: null
};
