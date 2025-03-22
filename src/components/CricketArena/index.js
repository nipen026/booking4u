import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Container, colors } from '@mui/material';
import { AccessTime, People, Star, LocationOn } from '@mui/icons-material';
import { BiSolidCricketBall } from "react-icons/bi";
import { TbCricket } from "react-icons/tb";
import { FaHandsWash, FaParking, FaWifi } from "react-icons/fa";
import { FaFirstAid } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { IoFastFoodOutline } from 'react-icons/io5';



const features = [
    { icon: <BiSolidCricketBall />, title: 'Professional Pitch', description: 'High-quality synthetic turf with clear pitch markings.', key: 'Pitch' },
    { icon: <TbCricket />, title: 'Cricket Kit Available', description: 'Rent professional cricket gear for a hassle-free game.', key: 'kit' },
    { icon: <FaParking />, title: 'Ample Parking', description: 'Spacious and secure parking for all vehicles.', key: 'Parking' },
    { icon: <FaFirstAid />, title: 'First Aid Support', description: 'Equipped with first aid kits for emergencies.', key: 'First Aid' },
    { icon: <IoIosWater />, title: 'Drinking Water', description: 'Purified drinking water dispensers available.', key: 'Drinking Water' },
    { icon: <FaWifi />, title: 'Free Wi-Fi', description: 'Enjoy high-speed internet access on-site.', key: 'Wi-Fi' },
    { icon: <IoFastFoodOutline />, title: 'Canteen', description: 'Delicious snacks and drinks for quick refreshment.', key: 'Canteen' },
    { icon: <FaHandsWash />, title: 'Clean Washroom', description: 'Hygienic and well-maintained washroom facilities.', key: 'Washroom' },
];



const CricketArena = ({ boxesData }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false
    };
    const filteredFeatures = features.filter(feature =>
        boxesData.facilities.includes(feature.key)
    );
    return (
        <Box sx={{ p: 3, backgroundColor: '#f9fafb', borderRadius: 3, boxShadow: 2 }}>
            {/* Image Carousel */}
            {boxesData?.images?.length !== 1 ?
                <Slider {...settings}>
                    {boxesData?.images?.map((img, index) => (
                        <img key={index} src={`${process.env.REACT_APP_BASE_URL}${img}`} alt={`Cricket Image ${index + 1}`} />
                    ))}
                </Slider> :
                <Box sx={{ width: '100%', height: '300px' }}>
                    <img src={`${process.env.REACT_APP_BASE_URL}${boxesData.images[0]}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Cricket Image`} />
                </Box>
            }

            {/* Venue Details */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 5 }}>
                {boxesData?.name}
            </Typography>

            <Container maxWidth={'xl'}>
                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                    <LocationOn sx={{ color: 'forestgreen' }} />
                    <Typography variant="body" sx={{ fontWeight: '500' }}>{boxesData?.location}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                    <Star sx={{ color: '#FFD700' }} />
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>4.8/5</Typography>
                </Box>

                {/* Pricing & Info */}
                <Grid container spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                            <Typography variant="h6" sx={{ color: 'forestgreen', fontWeight: '600' }}>₹{boxesData.discountPrice}/hour</Typography>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Best rates in the city</Typography>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                            <AccessTime sx={{ color: 'forestgreen' }} />
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>{boxesData.slots[0]} - {boxesData.slots.at(-1)}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Open all days</Typography>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                            <People sx={{ color: 'forestgreen' }} />
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Up to 10 players</Typography>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Ideal group size</Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Features Section */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>Facilities</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {filteredFeatures.map((feature, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h6" >{feature.icon}</Typography>
                                <Box>
                                    <Typography fontWeight="bold" sx={{ textAlign: 'left' }}>{feature.title}</Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'left' }}>{feature.description}</Typography>
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
