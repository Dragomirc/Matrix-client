import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { deleteProduct } from "app/redux/actions/product";
import { addToCart } from "app/redux/actions/user";
import { withRouter } from "react-router-dom";
import styles from "./styles.scss";

class ProductCard extends Component {
    onDetailsClick = () => {
        const { history, _id } = this.props;
        history.push(`/products/${_id}`);
    };

    onEditClick = () => {
        const { history, _id } = this.props;
        history.push(`/edit/${_id}`);
    };

    onDeleteClick = () => {
        const { history, _id, deleteProductConnect } = this.props;
        deleteProductConnect(_id).then(() => {
            history.push("/admin-products");
        });
    };

    onAddToCartClick = () => {
        const { history, _id, addToCartConnect } = this.props;
        addToCartConnect(_id).then(() => {
            history.push("/cart");
        });
    };

    render() {
        const { description, title, price, imageUrl, location } = this.props;
        let cardButtons = (
            <>
                <Button className="w-100 mr-1" onClick={this.onDetailsClick}>
                    Details
                </Button>
                <Button className="w-100" onClick={this.onAddToCartClick}>
                    Add to Cart
                </Button>
            </>
        );
        if (location.pathname === "/admin-products") {
            cardButtons = (
                <>
                    <Button className="w-100 mr-1" onClick={this.onEditClick}>
                        Edit
                    </Button>
                    <Button className="w-100" onClick={this.onDeleteClick}>
                        Delete
                    </Button>
                </>
            );
        }
        return (
            <Card className={classnames(styles.card, "m-2")}>
                <CardBody>
                    <CardTitle className="text-center">{title}</CardTitle>
                    <CardImg
                        src={`https://matrix-client-bucket.s3.eu-west-2.amazonaws.com/${imageUrl}`}
                        alt="product picture"
                        className="mb-2"
                    />
                    <CardText className="text-center">{description}</CardText>
                    <CardText className="text-center">{`${price} MDL`}</CardText>
                    <div className="d-flex justify-content-between">
                        {cardButtons}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

const mapDispatchToProps = {
    deleteProductConnect: deleteProduct,
    addToCartConnect: addToCart
};
export default connect(
    null,
    mapDispatchToProps
)(withRouter(ProductCard));

ProductCard.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    deleteProductConnect: PropTypes.func.isRequired,
    addToCartConnect: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};
