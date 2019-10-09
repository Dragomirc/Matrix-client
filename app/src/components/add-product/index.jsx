import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./styles.scss";

const AddProduct = props => {
    const {
        onSubmit,
        onInputChange,
        product: { title, description, price, category },
        btnText
    } = props;

    return (
        <Form
            className={classnames(styles.form, "mx-auto")}
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
                    multiple
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                    autoComplete="off"
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
                    autoComplete="off"
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={onInputChange}
                />
            </FormGroup>
            <FormGroup tag="fieldset">
                <div className="mb-1">Choose category</div>
                <FormGroup check>
                    <Label htmlFor="category1" check>
                        <Input
                            type="radio"
                            id="category1"
                            name="category"
                            value="1"
                            checked={category === "1"}
                            onChange={onInputChange}
                        />
                        Category 1
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label htmlFor="category2" check>
                        <Input
                            type="radio"
                            id="category2"
                            name="category"
                            value="2"
                            checked={category === "2"}
                            onChange={onInputChange}
                        />
                        Category 2
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label htmlFor="category3" check>
                        <Input
                            type="radio"
                            id="category3"
                            name="category"
                            value="3"
                            checked={category === "3"}
                            onChange={onInputChange}
                        />
                        Category 3
                    </Label>
                </FormGroup>
            </FormGroup>
            <Button className="w-100 mt-3">{btnText}</Button>
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
