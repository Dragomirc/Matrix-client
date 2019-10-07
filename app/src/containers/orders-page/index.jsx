/* eslint-disable */
import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const OrdersPage = ({ orders }) => {
    const getProductsView = products =>
        products.map(_p => (
            <Row key={_p._id} className="border border-success rounded my-1">
                <Col>{`${_p.productId.title}(${_p.quantity})`}</Col>
            </Row>
        ));
    const ordersItemsView = orders.map(_i => {
        const productsView = getProductsView(_i.products);
        return (
            <ListGroupItem key={_i._id}>
                <Row>
                    <Col>
                        <b>{`Order #: ${_i._id}`}</b>
                    </Col>
                </Row>
                {productsView}
            </ListGroupItem>
        );
    });

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <ListGroup>{ordersItemsView}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = ({ user }) => ({ orders: user.orders });
export default connect(mapStateToProps)(OrdersPage);

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired
};
