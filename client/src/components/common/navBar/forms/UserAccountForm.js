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

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const UserAccountForm = ({ formType }) => {
    const { signUp, signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        let firstName = '';
        let lastName = '';
        let rePassword = '';

        if (formType === 'register') {
            firstName = e.target.firstName.value;
            lastName = e.target.lastName.value;
            rePassword = e.target.rePassword.value;
        }

        if (!email || !password || (formType === 'register' && (!firstName || !lastName || !rePassword))) {
            toast.error('Please fill the form');
        }

        if (rePassword && rePassword !== password) {
            toast.error('Password mismatch!');
        }

        if (formType === 'register') {
            await signUp(email, password, firstName, lastName);
            navigate('/');
            toast.success('Your registration is successful!');
            toast.info('A verification email was sent to you!');
        } else {
            await signIn(email, password);
            navigate('/');
            toast.success('Login successfully!');
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        {formType === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <Grid container>
                        {formType === 'login' ? (
                            <Grid item xs>
                                <Link component={RouterLink} to="/" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        ) : null}
                        {formType === 'login' ? (
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    {'Already have an account? Sign In'}
                                </Link>
                            </Grid>
                        )}
                    </Grid>

                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
        </Grid>
    );
};

export default UserAccountForm;