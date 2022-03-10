import React from 'react';

import GlobalErrorPage from '../pages/GlobalErrorPage';

type State = {
    hasError: boolean; // like this
};

class GlobalErrorBoundary extends React.Component {
    state: State = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    async componentDidCatch(error, errorInfo) {
        await fetch('http://localhost:5000/errors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ errorInfo, message: error.message }),
        });
        console.log(errorInfo);
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            return <GlobalErrorPage />;
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
