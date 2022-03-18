import { gql } from '@apollo/client';

export const GET_All_PRODUCTS = gql`
    query GetAllProducts($limit: Int) {
        products(limit: $limit) {
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
            specification
            quantity
            image
            _id
            ratingScore {
                rating
                user
            }
            favoriteTo {
                _id
            }
            inCartTo {
                _id
            }
        }
    }
`;

export const GET_PRODUCT_OPINIONS = gql`
    query getProductsOpinion($id: ID!) {
        product(id: $id) {
            opinions {
                user
                opinion
                _id
            }
            ratingScore {
                rating
                user
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

export const GET_USER_PAYMENT_CARDS = gql`
    query getUserPaymentCards($userId: ID) {
        userPaymentCards(userId: $userId) {
            _id
            lastFourDigits
            expMonth
            expYear
        }
    }
`;
