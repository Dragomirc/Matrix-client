import React, { Component } from "react";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import classnames from "classnames";
import styles from "./styles.scss";

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactPerson: "",
            deliveryAddress: "",
            phoneNumber: ""
        };
    }

    onInputChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = event => {
        event.preventDefault();
    };

    render() {
        const { contactPerson, deliveryAddress, phoneNumber } = this.state;
        return (
            <Form className={classnames(styles.form, "mx-auto mt-5")}>
                <FormGroup>
                    <Label htmlFor="contactPerson">Contanct person</Label>
                    <Input
                        id="contactPerson"
                        name="contactPerson"
                        type="text"
                        autoComplete="off"
                        value={contactPerson}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Input
                        id="deliveryAddress"
                        name="deliveryAddress"
                        type="textarea"
                        autoComplete="off"
                        value={deliveryAddress}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        autoComplete="off"
                        value={phoneNumber}
                        onChange={this.onInputChange}
                    />
                </FormGroup>
                <Button className="w-100">Submit Order</Button>
            </Form>
        );
    }
}
export default OrderDetails;
