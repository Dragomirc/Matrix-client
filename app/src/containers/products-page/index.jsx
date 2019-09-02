import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductList from "app/components/product-list";

const ProductsPage = ({ shop: { products } }) => (
    <Container>
        <ProductList products={products} />
    </Container>
);

const mapStateToProps = ({ shop }) => ({ shop });
export default connect(mapStateToProps)(ProductsPage);

ProductsPage.propTypes = {
    shop: PropTypes.object.isRequired
};
