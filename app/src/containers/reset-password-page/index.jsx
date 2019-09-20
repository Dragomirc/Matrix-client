import React, { Component } from "react";
import { Container, Form, Input, Button, Label, FormGroup } from "reactstrap";
import classnames from "classnames";
import AuthService from "app/services/api/auth";
import styles from "./styles.scss";

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: ""
        };
    }

    onInputChange = ({ target: { value } }) => {
        this.setState({ emailValue: value });
    };

    onFormSubmit = e => {
        e.preventDefault();
        const { emailValue } = this.state;
        AuthService.resetPassword(emailValue);
    };

    render() {
        const { emailValue } = this.state;
        return (
            <Container>
                <Form
                    className={classnames(styles.form, "mt-3 mx-auto")}
                    onSubmit={this.onFormSubmit}
                >
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            id="email"
                            value={emailValue}
                            onChange={this.onInputChange}
                            autoComplete="off"
                        />
                    </FormGroup>
                    <Button className="w-100">Reset Password</Button>
                </Form>
            </Container>
        );
    }
}

export default ResetPasswordPage;
