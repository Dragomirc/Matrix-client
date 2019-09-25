import React from "react";
import { Container, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles.scss";

const CartPage = ({ cart }) => {
    const isCartEmpty = cart.length === 0;
    let cartHeadingText = "Your Cart";
    if (isCartEmpty) {
        cartHeadingText = "Your Cart is Empty!";
    }
    let orderButtonView = null;
    if (!isCartEmpty) {
        orderButtonView = (
            <Button
                className={classnames("mx-auto mt-3 d-block", styles.button)}
            >
                Order now!
            </Button>
        );
    }
    return (
        <Container>
            <ListGroup className="w-80 mx-auto mt-3">
                <ListGroupItem>
                    <Col className="text-center">{cartHeadingText}</Col>
                </ListGroupItem>
                {cart.map(({ _id, productId, quantity }) => (
                    <ListGroupItem
                        className="d-flex align-items-center"
                        key={_id}
                    >
                        <Col>{productId.title}</Col>
                        <Col>{`Quantitiy x ${quantity}`}</Col>
                        <Col className="flex-grow-0">
                            <Button className={styles.button}>Delete</Button>
                        </Col>
                    </ListGroupItem>
                ))}
            </ListGroup>
            {orderButtonView}
        </Container>
    );
};

const mapStateToProps = ({ user }) => ({ cart: user.cart });
export default connect(mapStateToProps)(CartPage);

CartPage.propTypes = {
    cart: PropTypes.array.isRequired
};
