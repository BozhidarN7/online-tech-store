import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProductOpinionsListItem from './ProductOpinionsListItem';
import Spinner from '../common/Spinner';
import { GET_PRODUCT_OPINIONS } from '../../graphql/queries';
import {
    GetProductOpinionsData,
    GetProductOpinionsVars,
} from '../../interfaces/gqlQueriesInterfaces';

type Props = {
    productId: string;
};

const ProductOpinionsList = ({ productId }: Props) => {
    const { data, loading } = useQuery<
        GetProductOpinionsData,
        GetProductOpinionsVars
    >(GET_PRODUCT_OPINIONS, {
        variables: {
            id: productId,
        },
    });

    if (loading) {
        return <Spinner />;
    }
    const product = data!.product;
    const opinions = product.opinions;
    const userRatings = product.ratingScore;
    const opinionsAndRatings = opinions
        .map((opinion: any) => {
            const userRating = userRatings.find(
                (ur: any) => opinion.user === ur.user
            );
            if (userRating) {
                return {
                    rating: userRating.rating,
                    opinion: opinion.opinion,
                    _id: opinion._id,
                };
            } else {
                return {
                    rating: 0,
                    opinion: opinion.opinion,
                    _id: opinion._id,
                };
            }
        })
        .filter((opinion: any) => opinion);

    return (
        <Box sx={{ mt: 5 }}>
            {opinionsAndRatings.length ? (
                <>
                    <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                        Opinions
                    </Typography>
                    <Grid
                        sx={{ boxShadow: 1, borderRadius: 2, p: 2 }}
                        container
                        direction="column"
                        spacing={3}
                    >
                        {opinionsAndRatings.map((or: any) => (
                            <ProductOpinionsListItem
                                opinion={or.opinion}
                                rating={or.rating}
                                key={or._id}
                            />
                        ))}
                    </Grid>
                </>
            ) : (
                <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                    Currently there are no opinions. Be the first one to share!
                </Typography>
            )}
        </Box>
    );
};

export default ProductOpinionsList;
