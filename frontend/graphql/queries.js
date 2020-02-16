import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query GET_VEHICLES($page: Int, $perPage: Int) {
    vehiclesPagination(page: $page, perPage: $perPage) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        photo
        brand {
          _id
          name
        }
        model
        price
      }
    }
  }
`;

export const GET_COMPUTERS = gql`
  query GET_COMPUTERS($page: Int, $perPage: Int) {
    computersPagination(page: $page, perPage: $perPage) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        photo
        brand {
          _id
          name
        }
        model
        price
      }
    }
  }
`;

export const GET_SHOES = gql`
  query GET_SHOES($page: Int, $perPage: Int) {
    shoesPagination(page: $page, perPage: $perPage) {
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        photo
        brand {
          _id
          name
        }
        model
        price
      }
    }
  }
`;

export const GET_SCHEMA = gql`
  query GET_SCHEMA($page: Int, $perPage: Int) {
    __schema {
      queryType {
        name
      }
    }
  }
`;

export const GET_FIELDS = gql`
  query GET_FIELDS {
    vehicle: __type(name: "Vehicle") {
      fields {
        name
      }
    }
    computer: __type(name: "Computer") {
      fields {
        name
      }
    }
    schoe: __type(name: "Shoe") {
      fields {
        name
      }
    }
  }
`;
