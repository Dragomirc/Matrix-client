/* eslint-disable react/jsx-curly-newline */
import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Button,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { deleteCartItem } from "app/redux/actions/user";
import OrderDetails from "app/components/order-details";
import requireAuth from "app/hoc/require-auth";
import styles from "./styles.scss";

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrderDetailsForm: false
        };
    }

    onPlaceOrderBtnClick = () => {
        this.setState({ showOrderDetailsForm: true });
    };

    render() {
        const { cart, deleteCartItemConnect } = this.props;
        const { showOrderDetailsForm } = this.state;
        const isCartEmpty = cart.length === 0;
        let total = 0;
        const cartItemsView = cart.map(({ _id, productId, quantity }) => {
            total += productId.price;
            return (
                <ListGroupItem
                    className="d-flex justify-content-center"
                    key={_id}
                >
                    <Row className="justify-content-between w-100">
                        <Col>{productId.title}</Col>
                        <Col>{`Quantitiy x ${quantity}`}</Col>
                        <Col xs={12} md={4}>
                            <Button
                                className={classnames(styles.button, "w-100")}
                                onClick={() =>
                                    deleteCartItemConnect(productId._id)
                                }
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </ListGroupItem>
            );
        });

        let cartHeadingText = "Your Cart is Empty!";
        let orderButtonView = null;
        let totalView = null;
        if (!isCartEmpty) {
            cartHeadingText = "Your Cart";
            orderButtonView = (
                <Button
                    className={classnames(
                        "mx-auto my-3 d-block",
                        styles.button
                    )}
                    onClick={this.onPlaceOrderBtnClick}
                >
                    Place Order
                </Button>
            );
            totalView = (
                <Col className="mt-3 text-center font-weight-bold">{`Total ${total}$`}</Col>
            );
        }
        let orderDetailsView = null;
        if (showOrderDetailsForm && !isCartEmpty) {
            orderDetailsView = (
                <>
                    <div className="mx-auto border-bottom mt-4" />
                    <OrderDetails />
                </>
            );
            orderButtonView = null;
        }

        return (
            <Container>
                <Row className="justify-content-center align-items-center flex-column">
                    <Col md={8}>
                        <ListGroup className="mx-auto">
                            <ListGroupItem>
                                <Col className="text-center">
                                    {cartHeadingText}
                                </Col>
                            </ListGroupItem>
                            {cartItemsView}
                        </ListGroup>
                    </Col>
                    {totalView}
                    {orderButtonView}
                    <Col md={8}>{orderDetailsView}</Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({ user }) => ({ cart: user.cart });
const mapDispatchToProps = { deleteCartItemConnect: deleteCartItem };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(CartPage));

CartPage.propTypes = {
    cart: PropTypes.array.isRequired,
    deleteCartItemConnect: PropTypes.func.isRequired
};
