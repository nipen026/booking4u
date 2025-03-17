import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container, colors } from '@mui/material';
import { AccessTime, People, Star, LocationOn } from '@mui/icons-material';
import { BiSolidCricketBall } from "react-icons/bi";
import { TbCricket } from "react-icons/tb";
import { FaParking } from "react-icons/fa";
import { FaFirstAid } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";


const images = [
    '/assets/images/banner.png',
    '/assets/images/banner.png',
    '/assets/images/banner.png',
    '/assets/images/banner.png'
];

const features = [
    { icon: <BiSolidCricketBall/>, title: 'Professional Pitch', description: 'High-quality synthetic turf with proper markings' },
    { icon: <TbCricket/>, title: 'Cricket Kit available', description: 'Professional cricket gear for rent' },
    { icon: <FaParking/>, title: 'Ample Parking', description: 'Free parking space for vehicles' },
    { icon: <FaFirstAid/>, title: 'First Aid', description: 'Emergency medical support available' },
    { icon: <IoIosWater/>, title: 'Drinking Water', description: 'Purified water dispensers' }
];

const CricketArena = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows:false
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f9fafb', borderRadius: 3, boxShadow: 2 }}>
            {/* Image Carousel */}
            <Slider {...settings}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Cricket Image ${index + 1}`} />
                ))}
            </Slider>

            {/* Venue Details */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 5 }}>
                Premium Box Cricket Arena
            </Typography>

          <Container maxWidth={'xl'}>
          <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                <LocationOn sx={{color:'forestgreen'}} />
                <Typography variant="body" sx={{fontWeight:'500'}}>123 Sports Complex, Cricket Street, City</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                <Star sx={{ color: '#FFD700' }} />
                <Typography variant="body2" sx={{fontWeight:'500'}}>4.8/5</Typography>
            </Box>

            {/* Pricing & Info */}
            <Grid container spacing={2} sx={{ mt: 3,alignItems:'center' }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h6" sx={{color:'forestgreen',fontWeight:'600'}}>₹999/hour</Typography>
                        <Typography variant="body2" sx={{fontWeight:'500'}}>Best rates in the city</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <AccessTime sx={{color:'forestgreen'}} />
                        <Typography variant="body2" sx={{fontWeight:'500'}}>6:00 AM - 11:00 PM</Typography>
                        <Typography variant="body2" sx={{fontWeight:'500'}}>Open all days</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <People sx={{color:'forestgreen'}} />
                        <Typography variant="body2"  sx={{fontWeight:'500'}}>Up to 10 players</Typography>
                        <Typography variant="body2" sx={{fontWeight:'500'}}>Ideal group size</Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Features Section */}
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Features</Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" >{feature.icon}</Typography>
                            <Box>
                                <Typography fontWeight="bold" sx={{textAlign:'left'}}>{feature.title}</Typography>
                                <Typography variant="body2" sx={{textAlign:'left'}}>{feature.description}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
          </Container>
        </Box>
    );
};

export default CricketArena;
