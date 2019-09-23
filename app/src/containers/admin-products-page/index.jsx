import React from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductList from "app/components/product-list";
import requireAuth from "app/hoc/require-auth";
import isUserAdmin from "app/hoc/is-user-admin";

const AdminProductsPage = ({ shop: { products } }) => (
    <Container>
        <ProductList products={products} />
    </Container>
);

const mapStateToProps = ({ shop }) => ({ shop });
export default connect(mapStateToProps)(
    requireAuth(isUserAdmin(AdminProductsPage))
);

AdminProductsPage.propTypes = {
    shop: PropTypes.object.isRequired
};
