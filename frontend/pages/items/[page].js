import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import withApollo from '../../lib/withData';
import { Items } from '../../components';
import AppContext from '../../AppContext';
import { GET_COMPUTERS, GET_SHOES, GET_VEHICLES, GET_SCHEMA } from '../../graphql/queries';
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
  const { currentSource } = React.useContext(AppContext);
  const { data, loading, error } = useQuery(selectQuery(currentSource.key), {
    variables: {
      page: Number(router.query.page),
      perPage,
    },
  });
  if (!currentSource || (currentSource && !currentSource.key)) {
    return <></>;
  }
  if (currentSource.type === 'rest') {
    return <h1>REST</h1>;
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  const [key] = Object.keys(data);
  return <Items {...data[key]} title={currentSource.name} page={Number(router.query.page)} />;
};

export default withApollo(ItemsList);
