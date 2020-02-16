import React from 'react';
import PropTypes from 'prop-types';
import MyNavbar from './Navbar';
import AppContext from '../AppContext';

const Layout = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [sources, setSources] = React.useState([]);
  const [currentSource, setCurrentSource] = React.useState({});
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    if (localStorage.getItem('g-fav-source')) {
      console.log(localStorage.getItem('g-fav-source'));
      const _currentSource = JSON.parse(localStorage.getItem('g-fav-source'));
      setCurrentSource(_currentSource);
    }
  }, []);
  return (
    <>
      <AppContext.Provider
        value={{
          user,
          token,
          sources,
          currentSource,
          setUser,
          setToken,
          setSources,
          setCurrentSource,
        }}
      >
        <MyNavbar />
        {children}
      </AppContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
