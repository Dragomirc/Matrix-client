import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Container, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { login } from "app/redux/actions/user";
import styles from "./styles.scss";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onInputChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = event => {
        event.preventDefault();
        const { loginConnect, history } = this.props;
        loginConnect(this.state).then(() => {
            history.push("/products");
        });
    };

    render() {
        const { email, password } = this.state;
        return (
            <Container>
                <Form
                    onSubmit={this.onFormSubmit}
                    className={classnames(styles.form, "mx-auto")}
                >
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="off"
                            value={email}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            autoComplete="off"
                            value={password}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>

                    <Button className="w-100">Login</Button>
                    <Button
                        className="w-100"
                        color="link"
                        tag={Link}
                        to="/reset-password"
                    >
                        Forgot password
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default connect(
    undefined,
    { loginConnect: login }
)(LoginPage);

LoginPage.propTypes = {
    loginConnect: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};
