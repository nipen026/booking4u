import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { REGISTER } from '../../Api/post';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        dob: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: 'user'
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.email.includes('@')) {
            newErrors.email = 'Enter a valid email';
        }
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
        }
        if (formData.phone.length > 10) {
            newErrors.phone = 'Phone Number 10 Digits only';
        }

        setErrors(newErrors);   
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const { confirm_password, ...submitData } = formData; // Exclude confirm_password from submission
            REGISTER(submitData).then((res) => {
                if (res.status === 201) {
                    toast.success('Register Successfully');
                    navigate('/login')
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    return (
        <Container maxWidth="sm">
            <Toaster />
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    error={!!errors.confirm_password}
                                    helperText={errors.confirm_password}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" color="success" type="submit">
                                    Register
                                </Button>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                                <Typography variant="body2" fontWeight="600" textAlign="center">
                                    Have an account?{' '}
                                    <a href="/login" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: 'bold' }}>
                                        Sign in
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
                        </Grid>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
