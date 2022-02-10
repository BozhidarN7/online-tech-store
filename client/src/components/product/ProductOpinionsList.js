import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProductOpinionsListItem from './ProductOpinionsListItem';
import Spinner from '../common/Spinner';
import { GET_PRODUCT_OPINIONS } from '../../graphql/queries';

const ProductOpinionsList = ({ productId }) => {
    const { data, loading } = useQuery(GET_PRODUCT_OPINIONS, {
        variables: {
            id: productId,
        },
    });

    if (loading) {
        return <Spinner />;
    }
    const product = data.product;

    const opinions = product.opinions;
    const userRatings = product.ratingScore;
    const opinionsAndRatings = userRatings
        .map((userRating) => {
            const opinion = opinions.find(
                (opinion) => opinion.user === userRating.user
            );
            if (opinion) {
                return {
                    rating: userRating.rating,
                    opinion: opinion.opinion,
                    _id: opinion._id,
                };
            } else {
                return null;
            }
        })
        .filter((opinion) => opinion);
    return (
        <Box sx={{ mt: 5 }}>
            <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                Opinions
            </Typography>
            <Grid
                sx={{ boxShadow: 1, borderRadius: 2, p: 2 }}
                container
                direction="column"
                spacing={3}
            >
                {opinionsAndRatings.map((or) => (
                    <ProductOpinionsListItem
                        opinion={or.opinion}
                        rating={or.rating}
                        key={or._id}
                    />
                ))}
            </Grid>
        </Box>
    );
};

export default ProductOpinionsList;
