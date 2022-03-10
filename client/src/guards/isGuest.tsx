import { Navigate } from 'react-router';

import { useAuth } from '../contexts/AuthCtx';

const isGuest = (WrappedComponent) => {
    const ComponentWrapper = (props) => {
        const { firebaseUser } = useAuth();

        if (firebaseUser) {
            return <Navigate to="/products" replace={true} />;
        }

        return <WrappedComponent {...props} />;
    };

    return <ComponentWrapper />;
};

export default isGuest;
