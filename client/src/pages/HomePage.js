import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from 'mui-image';

import { useTheme } from '@mui/material/styles';

import NavBar from '../components/common/navBar/NavBar';
import './Pages.css';

const HomePage = () => {
    const theme = useTheme();

    return (
        <>
            <NavBar />
            <Grid container>
                <Grid item container>
                    <Grid item xs={5} sx={{ p: 3 }}>
                        <Typography
                            sx={{ mb: 2, fontWeight: 'bold' }}
                            variant="h2"
                            component="h1"
                        >
                            Welcome to{' '}
                            <Typography
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                }}
                                variant="h2"
                                component="span"
                            >
                                TechShop
                            </Typography>
                        </Typography>
                        <Typography sx={{ mb: 2 }} variant="h6" component="p">
                            The online shop where you can buy the latest tech
                            gadgets on the lowest price and receive them in no
                            more then three working days.
                        </Typography>
                        <Button variant="contained">Browse products</Button>
                    </Grid>
                    <Grid item xs={7} className="clip-path-right">
                        <Box sx={{ height: 400 }}>
                            <Image
                                src="https://images.immediate.co.uk/production/volatile/sites/4/2020/05/Gadget-Discovery-Club-tech-subscription-box-cool-gadgets-3600bea.jpg?quality=90&resize=940,705"
                                alt="products"
                            ></Image>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={7} className="clip-path-left">
                        <Box sx={{ maxHeight: 400 }}>
                            <Image
                                src="https://api.time.com/wp-content/uploads/2017/05/laptops.jpg"
                                alt="laptops"
                            ></Image>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        sx={{
                            p: 3,
                        }}
                    >
                        <Typography
                            sx={{ mb: 2, fontWeight: 'bold' }}
                            variant="h4"
                            component="h2"
                        >
                            The newest{' '}
                            <Typography
                                variant="h4"
                                component="span"
                                sx={{
                                    fontWeight: 'bold',
                                    color: `${theme.palette.primary.main}`,
                                }}
                            >
                                Laptops
                            </Typography>{' '}
                            on the market
                        </Typography>
                        <Typography sx={{ mb: 2 }} variant="h6" component="p">
                            You can choose from wide range of brands and search
                            for the latest models. Ability to choose between
                            different hardware too.
                        </Typography>
                        <Button variant="contained">Browse Laptops</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container>
                <Grid item xs={5} sx={{ p: 3 }}>
                    <Typography
                        sx={{ mb: 2, fontWeight: 'bold' }}
                        variant="h4"
                        component="h2"
                    >
                        Modern professional and none professional{' '}
                        <Typography
                            variant="h4"
                            component="span"
                            sx={{
                                fontWeight: 'bold',
                                color: `${theme.palette.primary.main}`,
                            }}
                        >
                            Drones
                        </Typography>
                    </Typography>
                    <Typography sx={{ mb: 2 }} variant="h6" component="p">
                        You can find Drones suitable for everything like
                        competitions, photography, GPS Drones and much more.
                    </Typography>
                    <Button variant="contained">Browse Drones</Button>
                </Grid>
                <Grid item xs={7} className="clip-path-right">
                    <Box sx={{ maxHeight: 400 }}>
                        <Image
                            src="https://www.aw-drones.eu/wp-content/uploads/2021/11/DJI_Mavic2_Lifestyle_2_rgb.jpg"
                            alt="Drones"
                        ></Image>
                    </Box>
                </Grid>
                <Grid item container>
                    <Grid item xs={7} className="clip-path-left">
                        <Box sx={{ maxHeight: 400 }}>
                            <Image
                                src="https://pyxis.nymag.com/v1/imgs/6bc/582/143fdc546c8caa47490ad5aa0b36124fcd-02-computer.2x.rsocial.w600.jpg"
                                alt="monitors"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={5} sx={{ p: 3 }}>
                        <Typography
                            sx={{ mb: 2, fontWeight: 'bold' }}
                            variant="h4"
                            component="h2"
                        >
                            <Typography
                                variant="h4"
                                component="span"
                                sx={{
                                    fontWeight: 'bold',
                                    color: `${theme.palette.primary.main}`,
                                }}
                            >
                                Monitors
                            </Typography>{' '}
                            for everyone
                        </Typography>
                        <Typography sx={{ mb: 2 }} variant="h6" component="p">
                            If your are searching for a new monitor this is the
                            place where you will find the best one suitable for
                            your goals.
                        </Typography>
                        <Button variant="contained">Browse Monitros</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
