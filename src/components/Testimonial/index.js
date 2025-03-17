import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Rating } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        name: "Rahul Sharma",
        image: "/images/rahul.jpg",
        rating: 5,
        review: "Best cricket facilities I've experienced. The booking process is smooth and hassle-free."
    },
    {
        name: "Amit Patel",
        image: "/images/amit.jpg",
        rating: 4.5,
        review: "Great experience! The cricket boxes are well-maintained and the staff is very helpful."
    },
    {
        name: "Vikas Singh",
        image: "/images/vikas.jpg",
        rating: 4,
        review: "Excellent service and professional setup. Will definitely book again!"
    }
];

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                What Cricket Lovers Say
            </Typography>

            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <Box key={index} sx={{ px: 2 }}>
                        <Card sx={{ p: 3, boxShadow: 2, borderRadius: 3,mx:2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mb: 2
                                }}
                            >
                                <Avatar src={testimonial.image} alt={testimonial.name} sx={{ width: 50, height: 50 }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {testimonial.name}
                                    </Typography>
                                    <Rating value={testimonial.rating} precision={0.5} readOnly />
                                </Box>
                            </Box>

                            <CardContent sx={{ textAlign: 'left', color: 'text.secondary' }}>
                                <Typography variant="body2">{testimonial.review}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default Testimonial;
