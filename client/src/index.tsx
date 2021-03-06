import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { store } from './app/store';
import * as serviceWorker from './serviceWorker';
import App from './App';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const client = new ApolloClient({
    uri: ' http://localhost:5000',
    cache: new InMemoryCache({
        typePolicies: {
            Product: {
                fields: {
                    favoriteTo: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    inCartTo: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    ratingScore: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
            User: {
                fields: {
                    favorites: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    cart: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    ratings: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
