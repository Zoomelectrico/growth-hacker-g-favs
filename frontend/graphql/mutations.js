import gql from 'graphql-tag';

export const ADD_TO_FAVORITES = gql`
  mutation ADD_TO_FAVORITES($userId: String!, $favoriteId: String!) {
    addToFavorites(userId: $userId, favoriteId: $favoriteId) {
      success
      msg
      err
    }
  }
`;

export const DELETE_FROM_FAVORITES = gql`
  mutation DELETE_TO_FAVORITES($userId: String!, $favoriteId: String!) {
    deleteFromFavorites(userId: $userId, favoriteId: $favoriteId) {
      success
      msg
      err
    }
  }
`;
