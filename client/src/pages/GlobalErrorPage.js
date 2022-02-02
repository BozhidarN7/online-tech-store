import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'mui-image';

const GlobalErroPage = () => {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item sx={{ textAlign: 'center' }}>
                <Image
                    src="https://www.offset101.com/wp-content/uploads/2020/04/404.jpg"
                    height={400}
                />
                <Typography variant="h3" component="h1">
                    There seems to be a problem with the application!
                </Typography>
                <Typography variant="h6" component="p">
                    We recieve logs for every mistake that occurs, so we will
                    investigate the problem right away
                </Typography>
                <Typography variant="h6" component="p">
                    Try reloading the page and if the problem still persists
                    contact our support team at support@techshop.com
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => window.location.reload(true)}
                    sx={{ mt: 2 }}
                >
                    Reload Page
                </Button>
            </Grid>
        </Grid>
    );
};

export default GlobalErroPage;
