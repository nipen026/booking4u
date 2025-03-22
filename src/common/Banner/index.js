import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: 'calc(90vh)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1 // Video layer
                }}
            >
                <source src="/assets/images/banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Black Overlay for Darkening Effect */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black overlay with opacity
                    zIndex: 2 // Overlay above video
                }}
            />

            {/* Content Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 3, // Text at the top layer
                    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.9)', // Improved text clarity
                    px: 2
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Book Your Cricket Box Now
                </Typography>
                <Typography variant="subtitle1">
                    Experience premium cricket facilities at your convenience
                </Typography>
            </Box>
        </Box>
    );
};

export default Banner;
