import React, { Component } from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { createProduct } from "app/redux/actions/product";

import { connect } from "react-redux";
import AddProduct from "app/components/add-product";

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
        const { createProductConnect } = this.props;
        createProductConnect(this.state);
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
)(AddProductPage);

AddProductPage.propTypes = {
    createProductConnect: PropTypes.func.isRequired
};
