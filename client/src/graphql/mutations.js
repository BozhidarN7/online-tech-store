import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation SignUp($firstName: String!, $lastName: String!, $email: String!) {
        signUp(firstName: $firstName, lastName: $lastName, email: $email) {
            _id
            email
            firstName
            lastName
        }
    }
`;

export const LOGIN_USER = gql`
    mutation SignIn($email: String!) {
        signIn(email: $email) {
            _id
            email
            firstName
            lastName
            cart {
                _id
            }
            favorites {
                _id
            }
        }
    }
`;

export const ADD_TO_FAVORITES = gql`
    mutation AddToFavorites($productId: ID!, $userId: ID!) {
        addToFavorites(productId: $productId, userId: $userId) {
            code
            success
            message
            user {
                _id
                favorites {
                    _id
                }
            }
            product {
                _id
                favoriteTo {
                    _id
                }
            }
        }
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($productId: ID!, $userId: ID!) {
        addToCart(productId: $productId, userId: $userId) {
            code
            success
            message
            user {
                _id
                cart {
                    _id
                }
            }
            product {
                _id
                inCartTo {
                    _id
                }
            }
        }
    }
`;
