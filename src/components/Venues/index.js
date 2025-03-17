import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Container } from '@mui/material';
import { LocationOn, People } from '@mui/icons-material';

const venues = [
    { name: 'Grand Plaza Convention Center', location: 'Downtown Financial District', rating: 4.8, capacity: 1200, price: '$$$', image: '/assets/images/banner.png' },
    { name: 'The Riverside Gallery', location: 'Riverside Arts Quarter', rating: 4.6, capacity: 300, price: '$$', image: '/images/venue2.jpg' },
    { name: 'Skyline Event Space', location: 'Business Bay Area', rating: 4.9, capacity: 800, price: '$$$$', image: '/images/venue3.jpg' },
    { name: 'Historic Opera House', location: 'Cultural District', rating: 4.7, capacity: 600, price: '$$$', image: '/images/venue4.jpg' },
    { name: 'The Garden Pavilion', location: 'Botanical Gardens', rating: 4.5, capacity: 400, price: '$$', image: '/images/venue5.jpg' },
    { name: 'Metropolitan Conference Center', location: 'City Center', rating: 4.8, capacity: 1500, price: '$$$$', image: '/images/venue6.jpg' },
];

const VenueCard = ({ venue }) => (
    <Card sx={{ mb: 2 }}>
        <CardMedia
            component="img"
            height="140"
            image={venue.image}
            alt={venue.name}
            loading="lazy"
        />
        <CardContent>
            <Typography variant="h6" mb={2} fontWeight="bold" sx={{ textAlign: 'left' }}>{venue.name}</Typography>
            <Typography variant="body2" mb={1} color="text.secondary" sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LocationOn fontSize="small" /> {venue.location}
            </Typography>
            <Typography variant="body2" mb={2} sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ⭐ {venue.rating} | <People fontSize="small" /> Up to {venue.capacity} | {venue.price}
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 1, borderColor: '#228b22', color: '#228b22' }}>View Details</Button>
        </CardContent>
    </Card>
);

export default function Venues() {
    return (
        <Box >
            {/* Filters */}
            <Box sx={{  marginTop: '30px', marginBottom: '10px', paddingBottom: '15px' }}>
                <Container maxWidth={'xl'}>

                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={6} md={2}><TextField select label="Location" fullWidth><MenuItem value="">Any</MenuItem></TextField></Grid>
                        <Grid item xs={12} sm={6} md={2}><TextField select label="Date" fullWidth><MenuItem value="">Any</MenuItem></TextField></Grid>
                        <Grid item xs={12} sm={6} md={2}><TextField select label="Capacity" fullWidth><MenuItem value="">Any</MenuItem></TextField></Grid>
                        <Grid item xs={12} sm={6} md={2}><TextField select label="Price Range" fullWidth><MenuItem value="">Any</MenuItem></TextField></Grid>

                    </Grid>
                </Container>
            </Box>
            <Container maxWidth={'xl'}>
                {/* Featured Venue */}
                <Typography variant="h5" mt={4} sx={{ mb: 2, fontWeight: 'bold', textAlign: 'left' }}>Featured Venues</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',         // 1 column for extra small screens (phones)
                            sm: 'repeat(2, 1fr)', // 2 columns for small screens (tablets)
                            md: 'repeat(3, 1fr)', // 3 columns for medium screens (desktops)
                            lg: 'repeat(4, 1fr)'  // 4 columns for large screens
                        },
                        gap: 2
                    }}
                >
                    {venues.map((venue, index) => (
                        <VenueCard key={index} venue={venue} />
                    ))}
                </Box>

                {/* All Venues */}
                <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 'bold', textAlign: 'left' }}>All Venues</Typography>
                <Grid container spacing={3}>
                    {venues.slice(1).map((venue, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <VenueCard venue={venue} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
