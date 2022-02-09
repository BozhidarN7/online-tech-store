import { useQuery } from '@apollo/client';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

import { GET_USER_BY_ID } from '../../graphql/queries';
import Spinner from '../common/Spinner';

const ProductOpinion = ({ product }) => {
    const theme = useTheme();

    const { data, loading } = useQuery(GET_USER_BY_ID, {
        variables: {
            id: localStorage.getItem('userInfo'),
        },
    });

    if (loading) {
        return <Spinner />;
    }

    const user = data.user;
    const userRating = user.ratings.find((pro) => pro.product === product._id);

    return (
        <Grid
            sx={
                {
                    // boxShadow: 1,
                    // borderRadius: 2,
                }
            }
            item
            container
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={0.7}>
                <Avatar>H</Avatar>
            </Grid>
            <Grid item xs>
                <Rating name="read-only" value={userRating.rating} readOnly />
                <Typography component="p">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Soluta, error blanditiis enim pariatur illum nesciunt est
                    minus sapiente reiciendis. Minus a reprehenderit maiores
                    commodi velit laudantium labore ex nisi temporibus?
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProductOpinion;
