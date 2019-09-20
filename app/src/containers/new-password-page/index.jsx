import React, { Component } from "react";
import { Container, Form, Input, Button, Label, FormGroup } from "reactstrap";
import classnames from "classnames";
import PropTypes from "prop-types";
import AuthService from "app/services/api/auth";
import styles from "./styles.scss";

class NewPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: ""
        };
    }

    onInputChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = e => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password === confirmPassword) {
            const { resetToken } = this.props;
            AuthService.newPassword({ password, resetToken });
        }
    };

    render() {
        const { password, confirmPassword } = this.state;
        return (
            <Container>
                <Form
                    className={classnames(styles.form, "mt-3 mx-auto")}
                    onSubmit={this.onFormSubmit}
                >
                    <FormGroup>
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            name="password"
                            id="password"
                            value={password}
                            onChange={this.onInputChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={this.onInputChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <Button className="w-100">Set New Password</Button>
                </Form>
            </Container>
        );
    }
}

NewPasswordPage.propTypes = {
    resetToken: PropTypes.string.isRequired
};
export default NewPasswordPage;
