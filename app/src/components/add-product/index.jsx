import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { createProduct } from "app/redux/actions/product";
import styles from "./styles.scss";

class AddProduct extends Component {
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
        const { createProductConnect } = this.props;
        event.preventDefault();
        createProductConnect(this.state);
    };

    render() {
        const { title, description, price } = this.state;

        return (
            <Form
                className={classnames(styles.form, "mx-auto mt-3")}
                onSubmit={this.onSubmit}
            >
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="image">Image</Label>
                    <Input
                        name="image"
                        id="image"
                        type="file"
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        type="textarea"
                        value={description}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <Button className="w-100">Add Product</Button>
            </Form>
        );
    }
}

export default connect(
    undefined,
    { createProductConnect: createProduct }
)(AddProduct);

AddProduct.propTypes = {
    createProductConnect: PropTypes.func.isRequired
};
