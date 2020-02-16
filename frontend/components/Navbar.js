import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

const MyNavbar = ({ isLoggedIn }) => {
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
              <Link href="/users/favorites/[page]" as="/users/favorites/1">
                <a className="nav-link">Favorites</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/items/[page]" as="/items/1">
                <a className="nav-link">Items</a>
              </Link>
            </NavItem>
            {!isLoggedIn ? (
              <>
                <NavItem>
                  <Link href="/sign-up">
                    <a className="btn btn-primary nav-link">Sign Up</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/sign-in">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <button type="button" className="btn btn-primary">
                  Sign Out
                </button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

MyNavbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default MyNavbar;
