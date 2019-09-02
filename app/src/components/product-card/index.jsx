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

    render() {
        const { description, title, price, imageUrl } = this.props;
        const isAdmin = true;
        let cardButtons = (
            <>
                <Button className="w-100 mr-1" onClick={this.onDetailsClick}>
                    Details
                </Button>
                <Button className="w-100">Add to Cart</Button>
            </>
        );
        if (isAdmin) {
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
                        src={imageUrl}
                        alt="product picture"
                        className="mb-2"
                    />
                    <CardText className="text-center">{description}</CardText>
                    <CardText className="text-center">{`${price} $`}</CardText>
                    <div className="d-flex justify-content-between">
                        {cardButtons}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default connect(
    undefined,
    { deleteProductConnect: deleteProduct }
)(withRouter(ProductCard));

ProductCard.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    deleteProductConnect: PropTypes.func.isRequired
};
