import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import AppContext from '../AppContext';
import { endpoint } from '../config';

const MyNavbar = ({ isLoggedIn }) => {
  const router = useRouter();
  const { sources, currentSource, setCurrentSource, setUser, setToken } = React.useContext(AppContext);
  const [_sources, setSources] = React.useState([]);
  const [_currentSource, _setCurrentSource] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setSources(sources);
  }, [sources]);

  React.useEffect(() => {
    _setCurrentSource(currentSource);
  }, [currentSource]);

  const toggle = () => setIsOpen(!isOpen);

  const onChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setCurrentSource(_sources.filter(({ key }) => key === value)[0]);
  };

  const signOut = async e => {
    e.preventDefault();
    const {
      data: { success, err },
    } = await axios.post(`${endpoint}/sign-out`, {}, { withCredentials: true });
    if (!success) {
      console.log(err);
    }
    setUser(null);
    setToken('');
    router.push('/');
  };

  return (
    <div>
      <Navbar color="white" light expand="lg" className="py-3 border-bottom">
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
            <NavItem>
              <div className="form-inline mr-2">
                <select
                  name="source"
                  id="source"
                  className="form-control border-0 bg-transparent"
                  value={(_currentSource && _currentSource.key) || 'none'}
                  onChange={onChange}
                >
                  <option disabled value="none">
                    Select a source
                  </option>
                  {_sources.map(source => (
                    <option key={source.key} value={source.key}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>
            </NavItem>
            {!isLoggedIn ? (
              <>
                <NavItem>
                  <Link href="/sign-up">
                    <a className="btn btn-primary nav-link text-white">Sign Up</a>
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
                <button type="button" className="btn btn-primary" onClick={signOut}>
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
