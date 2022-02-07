import { useMutation } from '@apollo/client';

import { ADD_TO_CART, ADD_TO_FAVORITES } from '../../graphql/mutations';

const useAddRemoveToCartAndFavorites = (userId, productId, accessToken) => {
    const [addRemoveToCart] = useMutation(ADD_TO_CART, {
        context: {
            headers: { 'x-authorization': accessToken },
        },
        variables: {
            userId,
            productId,
        },
    });

    const [addRemoveToFavorites] = useMutation(ADD_TO_FAVORITES, {
        context: { headers: { 'x-authorization': accessToken } },
        variables: {
            userId,
            productId,
        },
    });

    return { addRemoveToCart, addRemoveToFavorites };
};

export default useAddRemoveToCartAndFavorites;
