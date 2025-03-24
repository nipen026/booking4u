import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Card,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LOGIN } from '../../Api/post';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // Default to home if no previous page

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Invalid email format.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            LOGIN(formData)
                .then((res) => {
                    if (res.data.status) {
                        toast.success('Login Successfully');
                        localStorage.setItem('access-token', res.data.token);
                        navigate(from, { replace: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Container maxWidth="lg">
            <Toaster />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card sx={{ p: 4, mt: 5 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                        Login
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, backgroundColor: 'forestgreen' }}
                        >
                            Login
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                            <Typography variant="body2" fontWeight="600" textAlign="center" mb={3}>
                                Don't have an account?{' '}
                                <a href="/register" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Sign up
                                </a>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
                            <Typography variant="body2" fontWeight="600" textAlign="center">
                                <a href="/" style={{ color: 'forestgreen', fontWeight: 'bold' }}>
                                    Back To Home Page
                                </a>
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;
