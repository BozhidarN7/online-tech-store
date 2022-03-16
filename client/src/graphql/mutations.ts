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
    mutation AddRemoveToFavorites($productId: ID!, $userId: ID!) {
        addRemoveToFavorites(productId: $productId, userId: $userId) {
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
    mutation AddRemoveToCart($productId: ID!, $userId: ID!) {
        addRemoveToCart(productId: $productId, userId: $userId) {
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

export const RATE_PRODUCT = gql`
    mutation rateProduct($userId: ID!, $productId: ID!, $rating: Int!) {
        rate(userId: $userId, productId: $productId, rating: $rating) {
            user {
                ratings {
                    product
                    rating
                }
            }
            product {
                rating
            }
        }
    }
`;

export const BUY_PRODUCTS = gql`
    mutation BuyProducts($products: [OrderContent!]) {
        buyProducts(products: $products) {
            clientSecret
        }
    }
`;

export const ADD_OPPINION = gql`
    mutation addOpinion($userId: ID!, $productId: ID!, $opinion: String!) {
        addOpinion(userId: $userId, productId: $productId, opinion: $opinion) {
            product {
                opinions {
                    opinion
                }
            }
        }
    }
`;

export const REDUCE_QUANTITIES = gql`
    mutation reduceQuantities($productsIds: [String!], $quantities: [Int!]) {
        reduceQuantities(productsIds: $productsIds, quantities: $quantities) {
            products {
                _id
            }
        }
    }
`;
