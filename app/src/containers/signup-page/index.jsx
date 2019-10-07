import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { signup } from "app/redux/actions/user";
import styles from "./styles.scss";

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            email: ""
        };
    }

    onInputChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = event => {
        event.preventDefault();
        const { signupConnect, history } = this.props;
        signupConnect(this.state).then(() => {
            history.push("/login");
        });
    };

    render() {
        const { name, password, email } = this.state;
        return (
            <Container>
                <Form
                    onSubmit={this.onFormSubmit}
                    className={classnames(styles.form, "mx-auto")}
                >
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
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
                            type="text"
                            autoComplete="off"
                            value={password}
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <Button className="w-100">Signup</Button>
                </Form>
            </Container>
        );
    }
}

export default connect(
    undefined,
    { signupConnect: signup }
)(SignupPage);
SignupPage.propTypes = {
    history: PropTypes.object.isRequired,
    signupConnect: PropTypes.func.isRequired
};
