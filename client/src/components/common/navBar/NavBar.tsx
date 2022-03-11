import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

import { useAuth } from '../../../contexts/AuthCtx';
import { GET_USER_BY_ID } from '../../../graphql/queries';

const pages = ['Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];

const NavBar = () => {
    const userId = localStorage.getItem('userInfo');

    const { data, loading } = useQuery(GET_USER_BY_ID, {
        variables: {
            id: userId || undefined,
        },
    });

    const navigate = useNavigate();
    const { firebaseUser, logout } = useAuth()!;

    const [anchorElNav, setAnchorElNav] = useState<Element | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<Element | null>(null);

    if (loading) {
        return null;
    }
    const currentUser = data.user;

    const handleOpenNavMenu = (event: React.SyntheticEvent) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.SyntheticEvent) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = async () => {
        setAnchorElNav(null);
        await logout();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link style={{ color: 'white' }} to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <IconButton aria-label="logo">
                                <DeviceHubIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link to="/products">
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        Shop
                                    </Typography>
                                </MenuItem>
                            </Link>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Link to="/products">
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Shop
                            </Button>
                        </Link>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {!firebaseUser ? (
                        <Box
                            sx={{
                                flexGrow: 0,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <NavLink
                                    style={({ isActive }) => ({
                                        color: isActive ? '#22ff00' : 'white',
                                    })}
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </Button>
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <NavLink
                                    style={({ isActive }) => ({
                                        color: isActive ? '#22ff00' : 'white',
                                    })}
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </Button>
                        </Box>
                    ) : null}

                    {firebaseUser ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton
                                onClick={() => navigate('/favorites')}
                                arial-label="cart"
                                sx={{ mr: 3, pb: 0 }}
                            >
                                <Badge
                                    badgeContent={currentUser?.favorites.length}
                                    color="secondary"
                                >
                                    <FavoriteIcon
                                        sx={{ color: 'white', fontSize: 30 }}
                                    />
                                </Badge>
                            </IconButton>
                            <IconButton
                                onClick={() => navigate('/cart')}
                                arial-label="cart"
                                sx={{ mr: 3, pb: 0 }}
                            >
                                <Badge
                                    badgeContent={currentUser?.cart.length}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon
                                        sx={{ color: 'white', fontSize: 30 }}
                                    />
                                </Badge>
                            </IconButton>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={logoutHandler}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : null}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
