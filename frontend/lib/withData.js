/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { prodEndpoint, endpoint } from '../config';

const createClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NODE_ENV === 'development' ? `${endpoint}/graphql` : `${prodEndpoint}/graphql`,
    }),
    ssrMode: true,
  });

export default withApollo(createClient, {
  render: ({ Page, props }) => (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  ),
});
