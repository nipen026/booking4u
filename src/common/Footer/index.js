import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Container } from '@mui/material';
import { MdSportsCricket } from 'react-icons/md';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#111827', color: '#fff', py: 4 }}>
      <Container maxWidth={'xl'}>
      <Grid container spacing={3} sx={{ px: 3 }}>

{/* Logo & Description */}
<Grid item xs={12} sm={4}>
    <Typography
        variant="h6"
        component="div"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
    >
        <MdSportsCricket />
        <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}
        >
            booking<span style={{ color: 'forestgreen' }}>4</span>u.in
        </Typography>
    </Typography>
    <Typography sx={{ mt: 1,textAlign:'left' }}>
        Your trusted platform for cricket box bookings
    </Typography>
</Grid>

{/* Quick Links */}
<Grid item xs={12} sm={4}>
    <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
    <Link href="/" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>Home</Link>
    <Link href="/venues" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>Venues</Link>
    <Link href="/bookings" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>Bookings</Link>
    <Link href="/contact" color="inherit" underline="none" sx={{ display: 'block', mt: 1 }}>Contact</Link>
</Grid>

{/* Contact Us */}
<Grid item xs={12} sm={4}>
    <Typography variant="h6" fontWeight="bold">Contact Us</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>contact.booking4u@gmail.com</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>+91 82388 49664</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>Surat, Gujrat</Typography>
</Grid>
</Grid>

{/* Copyright & Social Icons */}
<Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', px: 3 }}>
<Typography variant="body2">
    © 2024 booking4u.in. All rights reserved.
</Typography>

{/* <Box sx={{ display: 'flex', gap: 2 }}>
    <IconButton sx={{ color: '#fff' }}><Facebook /></IconButton>
    <IconButton sx={{ color: '#fff' }}><Twitter /></IconButton>
    <IconButton sx={{ color: '#fff' }}><Instagram /></IconButton>
    <IconButton sx={{ color: '#fff' }}><LinkedIn /></IconButton>
</Box> */}
</Box>
      </Container>
        </Box>
    );
};

export default Footer;
