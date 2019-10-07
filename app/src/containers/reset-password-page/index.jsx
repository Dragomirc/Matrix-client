import React, { Component } from "react";
import { Container, Form, Input, Button, Label, FormGroup } from "reactstrap";
import classnames from "classnames";
import PropTypes from "prop-types";
import UserService from "app/services/api/user";
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
        const { history } = this.props;
        UserService.resetPassword(emailValue).then(() => {
            history.push("/login");
        });
    };

    render() {
        const { emailValue } = this.state;
        return (
            <Container>
                <Form
                    className={classnames(styles.form, "mx-auto")}
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

ResetPasswordPage.propTypes = {
    history: PropTypes.object.isRequired
};
