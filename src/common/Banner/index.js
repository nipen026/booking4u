import React from 'react';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';

const Banner = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/assets/images/banner.png)', // Add your background image here
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'calc(90vh)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                px: 2
            }}
        >
            {/* Heading Section */}
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                Book Your Cricket Box Now
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4 }}>
                Experience premium cricket facilities at your convenience
            </Typography>

            {/* Search Form */}
            <Box
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
                    gap: 2,
                    width: { xs: '100%', md: '60%' },
                    boxShadow: 3
                }}
            >
                <TextField
                    select
                    fullWidth
                    label="Select Location"
                    variant="outlined"
                >
                    <MenuItem value="location1">Location 1</MenuItem>
                    <MenuItem value="location2">Location 2</MenuItem>
                    <MenuItem value="location3">Location 3</MenuItem>
                </TextField>

                <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    select
                    fullWidth
                    label="Select Time Slot"
                    variant="outlined"
                >
                    <MenuItem value="9AM">9:00 AM - 10:00 AM</MenuItem>
                    <MenuItem value="10AM">10:00 AM - 11:00 AM</MenuItem>
                    <MenuItem value="11AM">11:00 AM - 12:00 PM</MenuItem>
                </TextField>
            </Box>

            {/* Search Button */}
            <Button
                variant="contained"
                sx={{
                    mt: 2,
                    backgroundColor: '#228b22',
                    width: { xs: '100%', md: '60%' }
                }}
            >
                Search Available Venues
            </Button>
        </Box>
    );
};

export default Banner;
