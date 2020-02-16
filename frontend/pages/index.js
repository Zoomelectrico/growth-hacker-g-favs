import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Sources } from '../components';
import AppContext from '../AppContext';

const Home = ({ success, sources }) => {
  const { setSources, setCurrentSource } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => {
    if (success && sources && sources.length > 0) {
      localStorage.setItem('g-fav-sources', JSON.stringify(sources));
      setSources(sources);
    }
    if (localStorage.getItem('g-fav-source')) {
      router.push('/items');
      const _currentSource = JSON.parse(localStorage.getItem('g-fav-source'));
      setCurrentSource(_currentSource);
      return () => {}; //* No React Error
    }
  }, [sources]);
  const changeSource = source => {
    setCurrentSource(source);
    localStorage.setItem('g-fav-source', JSON.stringify(source));
    router.push('/items');
  };
  return <Sources sources={sources} changeSource={changeSource} />;
};

Home.getInitialProps = async () => {
  const {
    data: { success, sources },
  } = await axios.get('http://localhost:3000/sources');
  return { success, sources };
};

Home.propTypes = {
  success: PropTypes.bool,
  sources: PropTypes.array,
};

Home.defaultProps = {
  success: true,
  sources: [],
};

export default Home;
