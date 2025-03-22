import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Container } from '@mui/material';
import { LocationOn, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { GET_BOX_FILTER } from '../../Api/get';


const VenueCard = ({ venue }) => (
    <Card sx={{ mb: 2 }}>
        <CardMedia
            component="img"
            height="140"
            image={`${process.env.REACT_APP_BASE_URL}${venue.images[0]}`}
            alt={venue.name}
            loading="lazy"
        />
        <CardContent>
            <Typography variant="h6" mb={1} fontWeight="bold" sx={{ textAlign: 'left' }}>{venue.name}</Typography>
            <Typography variant="body2" mb={1} color="text.secondary" sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LocationOn fontSize="small" /> {venue.location}
            </Typography>
            <Typography variant="body2" mb={2} sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ⭐ 4.9 <span>₹ {venue.pricePerHour}.00 / hr</span>
            </Typography>
            <Link to={`/box-details/${venue.name}`} state={venue.id}>
            <Button variant="outlined"  fullWidth sx={{ mt: 1, borderColor: '#228b22', color: '#228b22' }}>View Details</Button>
            </Link>
        </CardContent>
    </Card>
);

export default function Venues({boxesData}) {
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [filterData,setFilterData] =useState([])
    const priceRanges = [
        { label: "Below ₹500", min: 0, max: 500 },
        { label: "₹500 - ₹1000", min: 500, max: 1000 },
        { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
        { label: "Above ₹2000", min: 2000, max: 10000 },
    ];

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                let params = {};
                if (location) params.location = location;
                if (priceRange) {
                    const selectedRange = priceRanges.find(p => p.label === priceRange);
                    if (selectedRange) {
                        params.minPrice = selectedRange.min;
                        params.maxPrice = selectedRange.max;
                    }
                }

                const response = await GET_BOX_FILTER(params)
                // setFilteredData(response.data);
                setFilterData(response?.boxes)
                console.log(response);
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchFilteredData();
    }, [location, priceRange]);
    return (
        <Box >
            {/* Filters */}
            <Box sx={{ marginTop: '30px', marginBottom: '10px', paddingBottom: '15px' }}>
            <Container maxWidth={'xl'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            select
                            label="Location"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <MenuItem value="">Any</MenuItem>
                            {boxesData.map((box,index)=>{
                                return (
                                    <MenuItem key={box?.location} value={box?.location}>{box.location}</MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2}>
                        <TextField
                            select
                            label="Price Range"
                            fullWidth
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <MenuItem value="">Any</MenuItem>
                            {priceRanges.map((range) => (
                                <MenuItem key={range.label} value={range.label}>
                                    {range.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
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
                    {filterData.map((venue, index) => {
                        console.log(venue);
                        
                        return(
                            <VenueCard key={index} venue={venue} />
                        )
                    })}
                </Box>

                {/* All Venues */}
                {/* <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 'bold', textAlign: 'left' }}>All Venues</Typography>
                <Grid container spacing={3}>
                    {filterData.slice(1).map((venue, index) => {
                        console.log(venue);
                        
                        return(
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <VenueCard venue={venue} />
                            </Grid>
                        )
                    })}
                </Grid> */}
            </Container>
        </Box>
    );
}
