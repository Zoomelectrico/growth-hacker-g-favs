import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import withApollo from '../../../lib/withData';
import { endpoint, perPage } from '../../../config';
import { ADD_TO_FAVORITES, DELETE_FROM_FAVORITES } from '../../../graphql/mutations';
import { Items } from '../../../components';
import AppContext from '../../../AppContext';

const Favorites = ({ success, favorites }) => {
  const { user } = React.useContext(AppContext);
  const router = useRouter();
  const [totalPages, setTotalPages] = React.useState(Math.ceil(favorites.length / perPage));
  const [hasPreviousPage, setHasPreviousPage] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [deleteFromFavorites] = useMutation(DELETE_FROM_FAVORITES);
  const addFav = async (e, userId, favoriteId) => {
    try {
      e.preventDefault();
      const { data: addData } = await addToFavorites({ variables: { userId, favoriteId } });
      if (!addData.addToFavorites.success) {
        console.log(addData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeFav = async (e, userId, favoriteId) => {
    try {
      e.preventDefault();
      const { data: removeData } = await deleteFromFavorites({ variables: { userId, favoriteId } });
      if (!removeData.deleteFromFavorites.success) {
        console.log(removeData);
      }
      const page = Number(router.query.page);
      const start = perPage * (page - 1);
      const end = start + perPage;
      setItems(favorites.filter(({ _id }) => _id !== favoriteId).slice(start, end));
    } catch (err) {
      console.log(err);
    }
  };
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
      items={items.map(item => {
        item.isLiked = true;
        return item;
      })}
      page={Number(router.query.page)}
      count={favorites.length}
      auth={!!user}
      link="users/favorites"
      add={addFav}
      remove={removeFav}
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
