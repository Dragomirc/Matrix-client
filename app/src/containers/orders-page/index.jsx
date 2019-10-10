import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import requireAuth from "app/hoc/require-auth";
import PropTypes from "prop-types";

const OrdersPage = ({ orders }) => {
    const getProductsView = products =>
        products.map(_p => (
            <Row key={_p._id} className="border border-success rounded my-1">
                <Col>{`${_p.product.title}  -  ${_p.quantity} x ${_p.product.price} MDL`}</Col>
            </Row>
        ));
    const ordersItemsView = orders.map(_i => {
        const productsView = getProductsView(_i.products);
        const orderDate = _i.createdAt.split("T")[0];
        return (
            <ListGroupItem key={_i._id}>
                <Row>
                    <Col sm={8}>
                        <b>{`Order #: ${_i._id}`}</b>
                    </Col>
                    <Col sm={4}>
                        <b>{`Date: ${orderDate}`}</b>
                    </Col>
                </Row>
                {productsView}
                <Row>
                    <Col>
                        <b>Contact</b>
                        {`: ${_i.contactPerson}`}
                    </Col>
                    <Col>
                        <b>Tel:</b>
                        {` ${_i.phoneNumber}`}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Address:</b>
                        {` ${_i.deliveryAddress}`}
                    </Col>
                </Row>
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
export default connect(mapStateToProps)(requireAuth(OrdersPage));

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired
};
