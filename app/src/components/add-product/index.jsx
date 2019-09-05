import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles.scss";

const AddProduct = props => {
    const {
        onSubmit,
        onInputChange,
        product: { title, description, price },
        btnText
    } = props;
    return (
        <Form
            className={classnames(styles.form, "mx-auto mt-3")}
            onSubmit={onSubmit}
        >
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="image">Image</Label>
                <Input
                    name="image"
                    id="image"
                    type="file"
                    onChange={onInputChange}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                    spellCheck="true"
                    id="description"
                    name="description"
                    type="textarea"
                    value={description}
                    onChange={onInputChange}
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
                    onChange={onInputChange}
                />
            </FormGroup>
            <Button className="w-100">{btnText}</Button>
        </Form>
    );
};

export default AddProduct;

AddProduct.propTypes = {
    btnText: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
};
