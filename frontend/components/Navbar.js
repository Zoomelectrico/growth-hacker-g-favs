import React from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="lg">
        <Link href="/">
          <a className="navbar-brand">G Fav</a>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/">
                <a className="nav-link">Profile</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/">
                <a className="nav-link">Items</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/sign-up">
                <a className="nav-link">Sign Up</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/sign-in">
                <a className="nav-link">Sign In</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/">
                <a className="nav-link">Sign Out</a>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
