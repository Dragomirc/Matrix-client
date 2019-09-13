/* eslint-disable react/static-property-placement */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { createProduct } from "app/redux/actions/product";
import { connect } from "react-redux";
import AddProduct from "app/components/add-product";
import requireAuth from "app/hoc/require-auth";

class AddProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            price: "",
            image: ""
        };
    }

    onInputChange = ({ target: { value, name, files } }) => {
        if (files) {
            this.setState({ [name]: files[0] });
        } else {
            this.setState({ [name]: value });
        }
    };

    onSubmit = event => {
        event.preventDefault();
        const { createProductConnect, history } = this.props;
        createProductConnect(this.state).then(() =>
            history.push("/admin-products")
        );
    };

    render() {
        return (
            <Container>
                <AddProduct
                    product={this.state}
                    onSubmit={this.onSubmit}
                    onInputChange={this.onInputChange}
                    btnText="Add Product"
                />
            </Container>
        );
    }
}

export default connect(
    undefined,
    { createProductConnect: createProduct }
)(requireAuth(AddProductPage));

AddProductPage.propTypes = {
    createProductConnect: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};
