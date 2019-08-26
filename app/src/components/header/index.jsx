import React, { Component } from 'react';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import styles from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
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
      <Navbar color="primary" expand="md">
        <NavbarBrand href="/" className={styles.navLink}>Logo</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen}>
          <Nav>
            <NavItem >
              <NavLink href="/products" className={styles.navLink}>Products</NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem >
              <NavLink href="/add-product" className={styles.navLink}>Add Product</NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem >
              <NavLink href="/login" className={styles.navLink}>Login</NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem >
              <NavLink href="/signup" className={styles.navLink}>Signup</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
