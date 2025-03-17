import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WhyChooseBooking4U = () => {
    const features = [
        'Largest network of cricket boxes across the city',
        'Quality assured facilities and equipment',
        'Flexible booking options and time slots',
        'Competitive pricing with no hidden charges',
        'Dedicated customer support',
        'Regular maintenance and cleaning'
    ];

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6, lg: 10 }, // Responsive horizontal padding
                py: { xs: 4, sm: 6, md: 8, lg: 10 }  // Responsive vertical padding
            }}
        >
            <Grid container spacing={4} alignItems="center">
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <img
                        src="/assets/images/banner.png"
                        alt="Cricket Match"
                        style={{
                            width: '100%',
                            
                            objectFit: 'cover',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                </Grid>

                {/* Text Content Section */}
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Why Choose booking<span style={{ color: 'forestgreen' }}>4</span>u.in
                    </Typography>

                    <List>
                        {features.map((feature, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckCircleIcon sx={{ color: 'forestgreen' }} />
                                </ListItemIcon>
                                <ListItemText primary={feature} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WhyChooseBooking4U;
