import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Apps, LocationOn, AccessTime, HeadsetMic } from '@mui/icons-material';

const features = [
    {
        icon: <Apps sx={{ fontSize: 40, color: 'forestgreen' }} />,
        title: 'Professional Equipment',
        description: 'High-quality cricket gear and maintained pitches.'
    },
    {
        icon: <LocationOn sx={{ fontSize: 40, color: 'forestgreen' }} />,
        title: 'Multiple Locations',
        description: 'Convenient venues across the city.'
    },
    {
        icon: <AccessTime sx={{ fontSize: 40, color: 'forestgreen' }} />,
        title: 'Online Booking',
        description: 'Easy and instant booking process.'
    },
    {
        icon: <HeadsetMic sx={{ fontSize: 40, color: 'forestgreen' }} />,
        title: '24/7 Support',
        description: 'Round-the-clock customer assistance.'
    }
];

const WhyChooseUs = () => {
    return (
        <Box sx={{ px: 4, py: 6, textAlign: 'center',backgroundColor:'#F9FAFB' }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 4 }}
            >
                Why Choose Us
            </Typography>

            <Grid container spacing={3}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                boxShadow: 0,
                                backgroundColor: 'transparent'
                            }}
                        >
                            <CardContent>
                                {feature.icon}
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ mt: 2 }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WhyChooseUs;
