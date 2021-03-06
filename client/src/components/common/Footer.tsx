import { useTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

const Footer = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: 1,
                bgcolor:
                    theme.palette.mode === 'dark'
                        ? theme.palette.divider
                        : theme.palette.primary.main,
                color: 'white',
            }}
        >
            <Container maxWidth="xl" component="footer">
                <Grid container sx={{ pl: 1, py: 3 }}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="h4" component="h3">
                                <DeviceHubIcon sx={{ fontSize: 60 }} /> TechShop
                            </Typography>
                        </Box>

                        <Typography
                            sx={{ fontWeight: 'bold' }}
                            variant="body1"
                            component="p"
                        >
                            The best tech shop online
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                            Company
                        </Typography>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="About us" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Contact us" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Privacy Policy" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-end">
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', ml: 2 }}>
                                Services
                            </Typography>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Laptops" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Drones" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Monitors" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={2} container>
                        <List sx={{ ml: 'auto' }}>
                            <ListItem disablePadding>
                                <IconButton>
                                    <InstagramIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <IconButton>
                                    <FacebookIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <IconButton>
                                    <LinkedInIcon />
                                </IconButton>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
