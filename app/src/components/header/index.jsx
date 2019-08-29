import React, { Component } from "react";
import {
    Navbar,
    Collapse,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    render() {
        const { isOpen } = this.state;
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand to="/" className={styles.navLink}>
                    Logo
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/products"
                                className={styles.navLink}
                            >
                                Products
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/add-product"
                                className={styles.navLink}
                            >
                                Add Product
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/login"
                                className={styles.navLink}
                            >
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/signup"
                                className={styles.navLink}
                            >
                                Signup
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;
