import React, { useState } from 'react';
import {
    Box, Typography, Button, Card, CardContent, Grid, Chip, TextField, Tab, Tabs, Pagination
} from '@mui/material';

const bookingsData = [
    {
        hotel: 'Grand Plaza Hotel',
        checkIn: 'Dec 15, 2023',
        checkOut: 'Dec 20, 2023',
        guests: '2 Adults',
        roomType: 'Deluxe Ocean View',
        bookingRef: 'BOK789012',
        status: 'Confirmed',
    },
    {
        hotel: 'Mountain Resort & Spa',
        checkIn: 'Jan 5, 2024',
        checkOut: 'Jan 8, 2024',
        guests: '4 Adults',
        roomType: 'Family Suite',
        bookingRef: 'BOK789013',
        status: 'Confirmed',
    },
    {
        hotel: 'City Lights Hotel',
        checkIn: 'Nov 20, 2023',
        checkOut: 'Nov 22, 2023',
        guests: '2 Adults',
        roomType: 'Executive Suite',
        bookingRef: 'BOK789014',
        status: 'Completed',
    },
];

const MyBookings = () => {
    const [search, setSearch] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [page, setPage] = useState(1);

    const handleTabChange = (event, newValue) => setTabValue(newValue);
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handlePageChange = (event, value) => setPage(value);

    const filteredBookings = bookingsData.filter(booking =>
        booking.hotel.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                My Bookings
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Manage your upcoming and past reservations
            </Typography>

            {/* Tabs */}
            

            {/* Search */}
        <Box sx={{display:'flex',justifyContent:'flex-end'}}> 
        <TextField
                variant="outlined"
                placeholder="Search bookings..."
                value={search}
                onChange={handleSearchChange}
                sx={{ mb: 3,width:'300px',textAlign:'right' }}
            />
        </Box>

            {/* Booking Cards */}
            {filteredBookings.map((booking, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Grid spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left' }}>
                                    {booking.hotel}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                    Check-in: {booking.checkIn} | Check-out: {booking.checkOut}
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: 'left' }}>
                                    Guests: {booking.guests} | Room Type: {booking.roomType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                    Booking reference: {booking.bookingRef}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent="flex-end" gap={1} mt={2}>
                                <Chip
                                    label={booking.status}
                                    sx={{
                                        backgroundColor: booking.status === 'Confirmed'
                                            ? 'rgba(34, 197, 94, 0.1)' // Green for Confirmed
                                            : booking.status === 'Completed'
                                                ? 'rgba(0, 0, 0, 0.1)'     // Grey for Completed
                                                : 'rgba(239, 68, 68, 0.1)', // Red for other statuses (e.g., Canceled)
                                        color: booking.status === 'Confirmed'
                                            ? 'green'
                                            : booking.status === 'Completed'
                                                ? '#4B5563'                // Dark grey text for Completed
                                                : 'red',                   // Red text for other statuses
                                        fontWeight: 'bold',
                                        borderRadius: '6px'
                                    }}
                                />
                                <Button variant="outlined" sx={{borderColor:'#22C55E',color:'#22C55E'}}>View Details</Button>
                                <Button variant="contained" sx={{ backgroundColor: '#22C55E' }}>
                                    Modify Booking
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}


        </Box>
    );
};

export default MyBookings;
