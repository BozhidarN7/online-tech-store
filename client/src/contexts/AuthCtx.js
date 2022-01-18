import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { auth, authService } from '../config/firebaseConfig';
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations';

const AuthCtx = React.createContext();

export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }) => {
    const [register] = useMutation(REGISTER_USER);
    const [login] = useMutation(LOGIN_USER);

    const [currentUser, setCurrentUser] = useState();
    const [userRole, setUserRole] = useState('');
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                user.getIdTokenResult(true)
                    .then((idTokenResult) => {
                        setUserRole(idTokenResult.claims['role']);
                    })
                    .catch((err) => console.log(err.message))
                    .finally(() => setIsAuthLoading(false));
            } else {
                setIsAuthLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const signUp = async (email, password, firstName, lastName) => {
        const firebaseUserCredentials = await authService.createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const idToken = await firebaseUserCredentials.user.getIdToken();

        const data = await register({
            variables: { email, firstName, lastName },
            context: { headers: { 'x-authorization': idToken } },
        });
        const userDetails = data.signUp;

        return userDetails;
    };

    const signIn = async (email, password) => {
        const firebaseUserCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await firebaseUserCredentials.user.getIdToken();
        console.log(idToken);
        const data = await login({
            variables: { email },
            context: { headers: { 'x-authorization': idToken } },
        });
        const userDetails = data.signIn;

        return userDetails;
    };

    const logout = async () => {
        return await authService.signOut(auth);
    };

    const value = { signUp, signIn, logout, currentUser, userRole, isAuthLoading };

    return <AuthCtx.Provider value={value}>{!isAuthLoading && children}</AuthCtx.Provider>;
};