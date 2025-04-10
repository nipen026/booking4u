import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const cricketBoxes = [
    {
        id: 1,
        title: "Premium Cricket Arena",
        location: "Mumbai Central",
        price: "₹1999/hr",
        image: "/assets/images/banner.png",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        title: "Sports Hub Cricket Box",
        location: "Andheri West",
        price: "₹1499/hr",
        image: "/assets/images/banner.png",
        rating: 4.0,
        reviews: 95
    },
    {
        id: 3,
        title: "Cricket Zone",
        location: "Bandra East",
        price: "₹1799/hr",
        image: "/assets/images/banner.png",
        rating: 4.3,
        reviews: 156
    }
];

const PopularCricket = ({boxesData}) => {

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6, lg: 10 }, // Responsive horizontal padding
                py: { xs: 4, sm: 6, md: 8, lg: 10 }  // Responsive vertical padding
            }}
        >
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 6 }} gutterBottom>
                Popular Cricket Boxes
            </Typography>

            <Grid container spacing={2}>
                {boxesData.map((box) => (
                    <Grid item xs={12} sm={6} md={4} key={box.id}>
                        <Link to={`/box-details/${box.name}`} state={box.id} style={{ textDecoration: 'none' }}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={`${process.env.REACT_APP_BASE_URL}${box.images[0]}`}
                                    alt={box.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" sx={{textAlign:'left',textTransform:'capitalize'}}>
                                        {box.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 ,textTransform:'capitalize'}}
                                    >
                                        <LocationOnIcon />
                                        {box.location}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                        <Rating value={5} precision={0.5} readOnly />
                                        <Typography variant="body2" color="text.secondary">
                                            (5)
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex',justifyContent:'space-between', alignItems: 'center', mt: 2 }}>
                                       <Box sx={{ display: 'flex',justifyContent:'space-between', alignItems: 'center', gap:'10px' }}>
                                       <Typography variant="h6" sx={{ color: '#000' }} fontWeight="bold" color="primary">
                                        {box.discountPrice ? `₹ ${box.discountPrice}.00` : `₹ ${box.pricePerHour}.00`}
                                        </Typography>
                                        <del>
                                        {box.discountPrice ? `₹ ${box.pricePerHour}.00` : ''}
                                        </del>
                                       </Box>
                                        <Button variant="outlined" sx={{ borderColor: 'forestgreen', color: 'forestgreen' }}>Book Now</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PopularCricket;
