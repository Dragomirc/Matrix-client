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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "app/redux/actions/user";
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
        const { isAuth, admin, logoutConnect } = this.props;

        let adminView = null;
        if (admin) {
            adminView = (
                <>
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
                            to="/admin-products"
                            className={styles.navLink}
                        >
                            Admin Products
                        </NavLink>
                    </NavItem>
                </>
            );
        }
        let authenticatedView = (
            <>
                <NavItem>
                    <NavLink tag={Link} to="/cart" className={styles.navLink}>
                        Cart
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/orders" className={styles.navLink}>
                        Orders
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        tag={Link}
                        to="/login"
                        className={styles.navLink}
                        onClick={logoutConnect}
                    >
                        Logout
                    </NavLink>
                </NavItem>
            </>
        );
        if (!isAuth) {
            authenticatedView = (
                <>
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
                </>
            );
        }
        return (
            <Navbar color="light" light expand="md" className="mb-3">
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
                        {adminView}
                        {authenticatedView}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    isAuth: user.userId,
    admin: user.admin
});
export default connect(
    mapStateToProps,
    { logoutConnect: logout }
)(Header);

Header.propTypes = {
    isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    admin: PropTypes.bool.isRequired,
    logoutConnect: PropTypes.func.isRequired
};

Header.defaultProps = {
    isAuth: null
};
