import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { auth, authService } from '../config/firebaseConfig';
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations';

type Props = {
    children: React.ReactNode;
};

interface AuthContextInterface {
    signUp: any;
    signIn: any;
    logout: any;
    firebaseUser: any;
    userRole: any;
    isAuthLoading: any;
}

const AuthCtx = React.createContext<AuthContextInterface | null>(null);

export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }: Props) => {
    const [register] = useMutation(REGISTER_USER);
    const [login] = useMutation(LOGIN_USER);

    const [firebaseUser, setFirebaseUser] = useState();
    const [userRole, setUserRole] = useState('');
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(
            auth,
            (user: any) => {
                setFirebaseUser(user);

                if (user) {
                    user.getIdTokenResult(true)
                        .then((idTokenResult: any) => {
                            setUserRole(idTokenResult.claims['role']);
                        })
                        .catch((err: Error) => {
                            console.log(err);
                            throw err;
                        })
                        .finally(() => setIsAuthLoading(false));
                } else {
                    setIsAuthLoading(false);
                }
            }
        );

        return unsubscribe;
    }, []);

    const signUp = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        try {
            const firebaseUserCredentials =
                await authService.createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
            const idToken = await firebaseUserCredentials.user.getIdToken();

            const data = await register({
                variables: { email, firstName, lastName },
                context: { headers: { 'x-authorization': idToken } },
            });
            const userDetails = data.data.signUp;

            localStorage.setItem('userInfo', userDetails._id);

            return userDetails;
        } catch (err) {
            throw err;
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const firebaseUserCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const idToken = await firebaseUserCredentials.user.getIdToken();
            const data = await login({
                variables: { email },
                context: { headers: { 'x-authorization': idToken } },
            });
            const userDetails = data.data.signIn;

            localStorage.setItem('userInfo', userDetails._id);
            return userDetails;
        } catch (err) {
            throw err;
        }
    };

    const logout = async () => {
        localStorage.removeItem('userInfo');
        return await authService.signOut(auth);
    };

    const value = {
        signUp,
        signIn,
        logout,
        firebaseUser,
        userRole,
        isAuthLoading,
    };

    return (
        <AuthCtx.Provider value={value}>
            {!isAuthLoading && children}
        </AuthCtx.Provider>
    );
};
