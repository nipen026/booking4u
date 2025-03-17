import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            console.log('Login Data:', formData);
        }
    };

    return (
        <Container maxWidth="lg">
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
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            margin="normal"
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

                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;
