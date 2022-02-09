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
            createdAt
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
            ratings {
                product
                rating
            }
        }
    }
`;

export const GET_USER_CART_PRODUCTS = gql`
    query GetCartProducts($id: ID) {
        user(id: $id) {
            cart {
                _id
                model
                brand
                description
                rating
                price
                image
                quantity
                favoriteTo {
                    _id
                }
                inCartTo {
                    _id
                }
            }
        }
    }
`;

export const GET_USER_FAVORITES_PRODUCTS = gql`
    query GetFavoritesProducts($id: ID) {
        user(id: $id) {
            favorites {
                _id
                model
                brand
                description
                rating
                price
                image
                favoriteTo {
                    _id
                }
                inCartTo {
                    _id
                }
            }
        }
    }
`;
