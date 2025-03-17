import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Container } from '@mui/material';
import dayjs from 'dayjs'; // For dynamic date generation

const generateDates = () => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, index) => ({
        day: today.add(index, 'day').format('ddd'),
        date: today.add(index, 'day').format('DD')
    }));
};

const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
];

const BookingSlots = () => {
    const [selectedDate, setSelectedDate] = useState(generateDates()[0].date);
    const [selectedSlots, setSelectedSlots] = useState([]);

    // Handle Slot Selection for Multiple Slots
    const handleSlotSelection = (time) => {
        if (selectedSlots.includes(time)) {
            setSelectedSlots(selectedSlots.filter(slot => slot !== time)); // Deselect if already selected
        } else {
            setSelectedSlots([...selectedSlots, time]); // Add to selected slots
        }
    };
    return (
        <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Book Your Slot
            </Typography>

            {/* Select Date Section */}
            <Container maxWidth={'xl'} >
                <Grid container spacing={1} sx={{ mb: 3 }}>
                    {generateDates().map(({ day, date }) => (
                        <Grid item key={date}>
                            <Button
                                variant={selectedDate === date ? 'contained' : 'outlined'}
                                sx={{
                                    backgroundColor: selectedDate === date ? '#228b22' : 'transparent',
                                    color: selectedDate === date ? '#fff' : '#000',
                                    minWidth: '70px',
                                    borderColor: '#228b22'
                                }}
                                onClick={() => setSelectedDate(date)}
                            >
                                {day} <br /> {date}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                {/* Select Time Slot Section */}
                <Grid container spacing={1}>
                    {timeSlots.map((time, index) => (
                        <Grid item xs={4} sm={3} md={2} key={index}>
                            <Button
                                variant={selectedSlots.includes(time) ? 'contained' : 'outlined'}
                                sx={{
                                    backgroundColor: selectedSlots.includes(time) ? '#228b22' : 'transparent',
                                    color: selectedSlots.includes(time) ? '#fff' : '#000',
                                    width: '100%',
                                    borderColor: '#228b22'

                                }}
                                onClick={() => handleSlotSelection(time)}
                            >
                                {time}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                    <Box sx={{display:'flex',justifyContent:'end'}}>
                    <Button
                  variant={'contained'}
                  sx={{
                    width:'200px',
                    height:'50px',
                    margin:'20px 0px 0px 0px',
                    backgroundColor:'#228b22'
                  }}
                >Book Now</Button>
                    </Box>
            </Container>
        </Box>
    );
};

export default BookingSlots;
