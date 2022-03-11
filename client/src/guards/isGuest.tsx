import { Navigate } from 'react-router';

import { useAuth } from '../contexts/AuthCtx';

const isGuest = (WrappedComponent: () => JSX.Element) => {
    const ComponentWrapper = (props: any) => {
        const { firebaseUser } = useAuth()!;

        if (firebaseUser) {
            return <Navigate to="/products" replace={true} />;
        }

        return <WrappedComponent {...props} />;
    };

    return <ComponentWrapper />;
};

export default isGuest;
