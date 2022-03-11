import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthCtx';

const isLogged = (WrapperComponent: () => JSX.Element) => {
    const ComponentWrapper = (props: any) => {
        const { firebaseUser } = useAuth()!;

        if (!firebaseUser) {
            return <Navigate to="/login" replace={true} />;
        }

        return <WrapperComponent {...props} />;
    };

    return <ComponentWrapper />;
};

export default isLogged;
