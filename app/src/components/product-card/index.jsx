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
import { withRouter } from "react-router-dom";
import styles from "./styles.scss";

class ProductCard extends Component {
    onDetailsClick = () => {
        const { history, _id } = this.props;
        history.push(`/products/${_id}`);
    };

    render() {
        const { description, title, price, imageUrl } = this.props;
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
                        <Button
                            className="w-100 mr-1"
                            onClick={this.onDetailsClick}
                        >
                            Details
                        </Button>
                        <Button className="w-100">Add to Cart</Button>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default withRouter(ProductCard);

ProductCard.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};
