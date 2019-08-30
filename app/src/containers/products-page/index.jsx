/* eslint-disable */
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts } from 'app/redux/actions/product';
import ProductList from 'app/components/product-list';

class ProductsPage extends Component {
    static fetchData({ store }) {
        return store.dispatch(getProducts());
    }

    render() {
        const {
            shop: { products }
        } = this.props;

        return (
            <Container>
                <ProductList products={products} />
            </Container>
        );
    }
}

const mapStateToProps = ({ shop }) => ({ shop });
export default connect(mapStateToProps)(ProductsPage);

ProductsPage.propTypes = {
    shop: PropTypes.object.isRequired
};
