/* eslint-disable react/jsx-curly-newline */
/* eslint-disable */
import React, { Component } from 'react';
import { Container, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { deleteCartItem } from 'app/redux/actions/user';
import OrderDetails from 'app/components/order-details';
import requireAuth from 'app/hoc/require-auth';
import styles from './styles.scss';

class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOrderDetailsForm: false
        };
    }
    render() {
        const { cart, deleteCartItemConnect } = this.props;
        const isCartEmpty = cart.length === 0;
        let total = 0;
        const cartItemsView = cart.map(({ _id, productId, quantity }) => {
            total += productId.price;
            return (
                <ListGroupItem className="d-flex align-items-center" key={_id}>
                    <Col>{productId.title}</Col>
                    <Col>{`Quantitiy x ${quantity}`}</Col>
                    <Col className="flex-grow-0">
                        <Button
                            className={styles.button}
                            onClick={() => deleteCartItemConnect(productId._id)}
                        >
                            Delete
                        </Button>
                    </Col>
                </ListGroupItem>
            );
        });
        let cartHeadingText = 'Your Cart';
        if (isCartEmpty) {
            cartHeadingText = 'Your Cart is Empty!';
        }
        let orderButtonView = null;

        let totalView = null;
        if (!isCartEmpty) {
            orderButtonView = (
                <Button
                    className={classnames(
                        'mx-auto my-3 d-block',
                        styles.button
                    )}
                >
                    Place Order
                </Button>
            );
            totalView = (
                <Col className="mt-3 text-center font-weight-bold">{`Total ${total}$`}</Col>
            );
        }

        return (
            <Container>
                <ListGroup className="w-80 mx-auto mt-3">
                    <ListGroupItem>
                        <Col className="text-center">{cartHeadingText}</Col>
                    </ListGroupItem>
                    {cartItemsView}
                </ListGroup>

                {totalView}
                {orderButtonView}
                <Col className="w-80 mx-auto border-bottom mt-4" />
                <OrderDetails />
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
