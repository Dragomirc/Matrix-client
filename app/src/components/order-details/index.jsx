import React, { Component } from "react";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { placeOrder } from "app/redux/actions/user";

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
        const { placeOrderConnect, history } = this.props;
        placeOrderConnect(this.state).then(() => {
            history.push("/orders");
        });
    };

    render() {
        const { contactPerson, deliveryAddress, phoneNumber } = this.state;
        return (
            <Form className="mx-auto mt-5" onSubmit={this.onFormSubmit}>
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
                <Button className="col-xs-12 col-md-4 mx-md-auto d-block">
                    Submit Order
                </Button>
            </Form>
        );
    }
}
const mapDispatchToProps = { placeOrderConnect: placeOrder };
export default connect(
    null,
    mapDispatchToProps
)(withRouter(OrderDetails));

OrderDetails.propTypes = {
    placeOrderConnect: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};
