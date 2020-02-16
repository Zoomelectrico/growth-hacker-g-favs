import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MyNavbar from './Navbar';
import AppContext from '../AppContext';
import { endpoint } from '../config';

const Layout = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [sources, setSources] = React.useState([]);
  const [currentSource, setCurrentSource] = React.useState({});
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    if (localStorage.getItem('g-fav-source')) {
      const _currentSource = JSON.parse(localStorage.getItem('g-fav-source'));
      setCurrentSource(_currentSource);
    }
  }, []);
  React.useEffect(() => {
    if (localStorage.getItem('g-fav-sources')) {
      const _sources = JSON.parse(localStorage.getItem('g-fav-sources'));
      setSources(_sources);
    }
  }, []);
  React.useEffect(() => {
    if (currentSource) {
      localStorage.setItem('g-fav-source', JSON.stringify(currentSource));
    }
  }, [currentSource]);
  React.useEffect(() => {
    const fetcher = async () => {
      const { data } = await axios.get(`${endpoint}/me`, {
        withCredentials: true,
      });
      if (!data.success) {
        return console.log(`err: ${data.err}`);
      }
      setToken(data.token);
      setUser(data.user);
    };
    fetcher();
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
        <MyNavbar isLoggedIn={!!user} />
        {children}
      </AppContext.Provider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
