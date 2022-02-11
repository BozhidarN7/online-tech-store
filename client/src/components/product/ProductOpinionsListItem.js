import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

const ProductOpinionsListItem = ({ opinion, rating }) => {
    return (
        <Grid
            sx={{
                boxShadow: 3,
                borderRadius: 2,
                mb: 2,
            }}
            item
            container
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={0.7}>
                <Avatar>H</Avatar>
            </Grid>
            <Grid item xs>
                <Rating name="read-only" value={rating} readOnly />
                <Typography component="p">{opinion}</Typography>
            </Grid>
        </Grid>
    );
};

export default ProductOpinionsListItem;
