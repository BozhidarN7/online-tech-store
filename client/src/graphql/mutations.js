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
        }
    }
`;
