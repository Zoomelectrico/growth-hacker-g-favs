import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import withApollo from '../../../lib/withData';
import { endpoint, perPage } from '../../../config';
import { Items } from '../../../components';
import AppContext from '../../../AppContext';

const Favorites = ({ success, favorites }) => {
  const { user } = React.useContext(AppContext);
  const router = useRouter();
  const [totalPages, setTotalPages] = React.useState(Math.ceil(favorites.length / perPage));
  const [hasPreviousPage, setHasPreviousPage] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [items, setItems] = React.useState([]);
  React.useState(() => {
    const page = Number(router.query.page);
    if (totalPages === 1) {
      setHasNextPage(false);
      setHasPreviousPage(false);
    } else if (page === 1) {
      setHasPreviousPage(false);
      setHasNextPage(true);
    } else if (page === totalPages) {
      setHasPreviousPage(true);
      setHasNextPage(false);
    } else {
      setHasPreviousPage(true);
      setHasNextPage(true);
    }
  }, [totalPages]);
  React.useState(() => {
    const page = Number(router.query.page);
    const start = perPage * (page - 1);
    const end = start + perPage;
    setItems(favorites.slice(start, end));
  }, [favorites]);
  React.useState(() => {
    setTotalPages(Math.ceil(favorites.length / perPage));
  }, [favorites]);
  React.useEffect(() => {
    if (!user) {
      // TODO: Handle Auth
      // router.push('/sign-in');
    }
  }, [user]);
  return (
    <Items
      title="Favorites"
      items={items}
      page={Number(router.query.page)}
      count={favorites.length}
      auth={!!user}
      link="users/favorites"
      pageInfo={{
        hasPreviousPage,
        hasNextPage,
      }}
    />
  );
};

Favorites.getInitialProps = async ctx => {
  try {
    const {
      data: { success, favorites },
    } = await axios.get(`${endpoint}/favorites`, {
      withCredentials: true,
      headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
    });
    return { success, favorites };
  } catch (err) {
    console.log(err.message);
  }
  return { success: false };
};

Favorites.propTypes = {
  success: PropTypes.bool,
  favorites: PropTypes.array,
};

Favorites.defaultProps = {
  success: true,
  favorites: [],
};

export default withApollo(Favorites);
