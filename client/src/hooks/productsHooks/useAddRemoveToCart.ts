import { useMutation } from '@apollo/client';

import { ADD_TO_CART, ADD_TO_FAVORITES } from '../../graphql/mutations';
import { GET_PRODUCT } from '../../graphql/queries';

const useAddRemoveToCartAndFavorites = (
    userId: string,
    productId: string,
    accessToken: string
) => {
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

    return {
        addRemoveToCart: (props: any = undefined) => addRemoveToCart(props),
        addRemoveToFavorites: (props: any = undefined) =>
            addRemoveToFavorites(props),
    };
};

export default useAddRemoveToCartAndFavorites;
