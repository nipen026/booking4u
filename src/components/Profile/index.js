import React from 'react';
import { Avatar, Box, Button, Card, CardContent, Grid, Typography, Divider, Chip, Container } from '@mui/material';

const Profile = () => {
    return (
       <Container maxWidth={'lg'}>
         <Box sx={{ p: 3 }}>
            {/* Profile Header */}
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ width: 80, height: 80 }} src="/profile.jpg" />
                <Box>
                    <Typography variant="h5" fontWeight="bold" align='left'>John Smith ✅</Typography>
                    <Typography color="text.secondary">New York, USA | Member since 2021</Typography>
                </Box>
                <Button variant="outlined" sx={{ ml: 'auto',borderColor:'#22C55E',color:'#22C55E' }}>Edit Profile</Button>
            </Box>

            {/* Stats Section */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
                {['48 Total Bookings', '32 Reviews Given', '16 Saved Places', '2,450 Reward Points'].map((item, index) => (
                    <Grid item xs={6} md={3} key={index}>
                        <Card sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">{item.split(' ')[0]}</Typography>
                            <Typography>{item.split(' ').slice(1).join(' ')}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Information & Details Section */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
                {/* Personal Information */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography>Full Name: John Robert Smith</Typography>
                        <Typography>Email: john.smith@example.com</Typography>
                        <Typography>Phone: +1 (555) 123-4567</Typography>
                        <Typography>Location: New York, USA</Typography>
                        <Typography>Languages: English, Spanish</Typography>
                    </Card>
                </Grid>

                {/* Recent Bookings */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Recent Bookings</Typography>
                        <Divider sx={{ my: 2 }} />
                        {[{ name: 'Luxury Ocean Resort', date: 'Dec 15 - Dec 20, 2023', status: 'Completed' },
                        { name: 'Mountain View Hotel', date: 'Nov 28 - Dec 2, 2023', status: 'Completed' },
                        { name: 'City Center Suites', date: 'Jan 5 - Jan 8, 2024', status: 'Upcoming' }].map((booking, index) => (
                            <Box key={index} sx={{ my: 1 }}>
                                <Typography fontWeight="bold">{booking.name}</Typography>
                                <Typography>{booking.date}</Typography>
                                <Chip label={booking.status} color={booking.status === 'Completed' ? 'success' : 'warning'} size="small" sx={{ mt: 1 }} />
                            </Box>
                        ))}
                    </Card>
                </Grid>

                {/* Recent Reviews */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold">Recent Reviews</Typography>
                        <Divider sx={{ my: 2 }} />
                        {[{ place: 'Luxury Ocean Resort', review: 'Excellent stay! The service was impeccable.', date: 'Dec 21, 2023' },
                        { place: 'Mountain View Hotel', review: 'Great location and friendly staff.', date: 'Dec 3, 2023' }].map((review, index) => (
                            <Box key={index} sx={{ my: 1 }}>
                                <Typography fontWeight="bold">{review.place}</Typography>
                                <Typography>{review.review}</Typography>
                                <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                            </Box>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Box>
       </Container>
    );
};

export default Profile;
