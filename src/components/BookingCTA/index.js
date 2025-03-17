import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const BookingCTA = () => {
    return (
        <Box
        sx={{
            backgroundColor: 'forestgreen',
            color: '#fff',
            textAlign: 'center',
            py: 10
            }}
            >
            <Container maxWidth={'xl'}>
            <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ mb: 3 }}
            >
                Ready to Book Your Cricket Session?
            </Typography>

          <Link style={{textDecoration:'none'}} to={'/venues'}>
          <Button
                variant="contained"
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    textTransform: 'none',
                    ':hover': {
                        backgroundColor: '#e6f2ff'
                    }
                }}
            >
                Book Now
            </Button>
            </Link>
       </Container>
        </Box>
    );
};

export default BookingCTA;
