import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import withApollo from '../../lib/withData';
import { Items } from '../../components';
import AppContext from '../../AppContext';
import { GET_COMPUTERS, GET_SHOES, GET_VEHICLES, GET_SCHEMA } from '../../graphql/queries';
import { ADD_TO_FAVORITES, DELETE_FROM_FAVORITES } from '../../graphql/mutations';
import { perPage } from '../../config';

const selectQuery = key => {
  switch (key) {
    case 'vehicles':
      return GET_VEHICLES;
    case 'computers':
      return GET_COMPUTERS;
    case 'shoes':
      return GET_SHOES;
    default:
      return GET_SCHEMA;
  }
};

const ItemsList = () => {
  const router = useRouter();
  const { currentSource, user } = React.useContext(AppContext);
  const [_user, setUser] = React.useState({});
  React.useEffect(() => {
    setUser(user);
  }, [user]);
  const { data, loading, error } = useQuery(selectQuery(currentSource.key), {
    variables: {
      page: Number(router.query.page),
      perPage,
    },
  });
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
    } catch (err) {
      console.log(err);
    }
  };
  if (!currentSource || (currentSource && !currentSource.key)) {
    return <></>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  const [key] = Object.keys(data);
  return (
    <Items
      {...data[key]}
      title={currentSource.name}
      page={Number(router.query.page)}
      auth={!!_user}
      fav={(_user && _user.favorites) || []}
      add={addFav}
      remove={removeFav}
    />
  );
};

export default withApollo(ItemsList);
