import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        dob: '',
        boxName: '',
        boxLocation: '',
        firstName: '',
        lastName: '',
        role: 'admin'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
                        Register as Admin
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth label="Confirm Password" type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} name="dob" value={formData.dob} onChange={handleChange} required />
                            </Grid>


                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" color="success" type="submit">
                                    Register
                                </Button>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
                                <Typography variant="body2" fontWeight="600" textAlign="center" mb={3}>
                                    Have an account?{' '}
                                    <a href="/login" style={{ color: 'forestgreen', textDecoration: 'none', fontWeight: 'bold' }}>
                                        Sign in 
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
