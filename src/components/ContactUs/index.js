import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add submission logic here
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 5,mb:10, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Your Company or Box"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        sx={{ mb: 3 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ backgroundColor: '#228b22', ':hover': { backgroundColor: '#1b6e1b' } }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default ContactUs;
