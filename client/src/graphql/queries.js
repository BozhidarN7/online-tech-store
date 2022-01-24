import { gql } from '@apollo/client';

export const GET_All_PRODUCTS = gql`
    query GetAllProducts {
        products {
            brand
            model
            category
            price
            rating
            quantity
            image
            _id
            favoriteTo {
                _id
            }
            inCartTo {
                _id
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query GetProductById($id: ID!) {
        product(id: $id) {
            brand
            model
            price
            rating
            quantity
            image
            _id
            favoriteTo {
                _id
            }
            inCartTo {
                _id
            }
        }
    }
`;

export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID) {
        user(id: $id) {
            _id
            cart {
                _id
            }
            favorites {
                _id
            }
        }
    }
`;
