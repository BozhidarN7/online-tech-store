import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../../../contexts/AuthCtx';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FirebaseError } from 'firebase/app';
import React from 'react';

type Props = {
    formType: string;
};

const Copyright = () => {
    return (
        <Typography
            sx={{ mt: 5 }}
            variant="body2"
            color="text.secondary"
            align="center"
        >
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const UserAccountForm = ({ formType }: Props) => {
    const { signUp, signIn } = useAuth()!;
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
            firstName: { value: string };
            lastName: { value: string };
            rePassword: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        let firstName = '';
        let lastName = '';
        let rePassword = '';

        if (formType === 'register') {
            firstName = target.firstName.value;
            lastName = target.lastName.value;
            rePassword = target.rePassword.value;
        }

        if (
            !email ||
            !password ||
            (formType === 'register' &&
                (!firstName || !lastName || !rePassword))
        ) {
            toast.error('Please fill the form');
            return;
        }

        if (rePassword && rePassword !== password) {
            toast.error('Password mismatch!');
            return;
        }

        if (formType === 'register') {
            try {
                await signUp(email, password, firstName, lastName);
                navigate('/products');
                toast.success('Your registration is successful!');
                toast.info('A verification email was sent to you!');
            } catch (err: any) {
                if (err.message.includes('email-already-in-use')) {
                    toast.error('Email is already in use!');
                } else if (err.message.includes('weak-password')) {
                    toast.error('Password must be at least 6 characters!');
                } else {
                    toast.error('Registration failed!');
                }
            }
        } else {
            try {
                await signIn(email, password);
                navigate('/products');
                toast.success('Login successfully!');
            } catch (err) {
                if (err instanceof FirebaseError) {
                    toast.error('Invalid username or password!');
                } else {
                    toast.error('Login failed!');
                }
            }
        }
    };
    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {formType === 'login' ? 'Sign in' : 'Sign Up'}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    {formType === 'register' ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoFocus
                            />
                        </>
                    ) : null}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {formType === 'register' ? (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rePassword"
                            label="Repeat Password"
                            type="password"
                            id="rePassword"
                            autoComplete="current-password"
                        />
                    ) : null}

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {formType === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <Grid container>
                        {formType === 'login' ? (
                            <Grid item xs>
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        ) : null}
                        {formType === 'login' ? (
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    {'Already have an account? Sign In'}
                                </Link>
                            </Grid>
                        )}
                    </Grid>

                    <Copyright />
                </Box>
            </Box>
        </Grid>
    );
};

export default UserAccountForm;
