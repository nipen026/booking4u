import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Container, Tabs, Tab } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ADD_BOOKING } from '../../Api/post';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const generateDates = () => {
    const today = dayjs();
    return Array.from({ length: 7 }, (_, index) => ({
        day: today.add(index, 'day').format('ddd'),
        date: today.add(index, 'day').format('DD'),
        month: today.add(index, 'day').format('M'),
        year: today.add(index, 'day').format('YYYY')
    }));
};

const BookingSlots = ({ setGetSelectDate,setGetTurfId, slotData, boxesData }) => {
    const [selectedDate, setSelectedDate] = useState(generateDates()[0]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookingData, setBookingData] = useState();
    const [activeTurfIndex, setActiveTurfIndex] = useState(0);
    const navigate = useNavigate();
    const handleSlotSelection = (time) => {
        const updatedSlots = [...selectedSlots];
    
        if (updatedSlots.includes(time)) {
            // If user unselects a slot, remove it
            const filtered = updatedSlots.filter(slot => slot !== time);
            setSelectedSlots(filtered);
            return;
        }
    
        if (updatedSlots.length >= 3) {
            // Limit to 3 slots max
            return;
        }
    
        // Add new slot
        updatedSlots.push(time);
    
        // Sort by actual time
        updatedSlots.sort((a, b) => {
            const aTime = dayjs(a, 'hh:mm A');
            const bTime = dayjs(b, 'hh:mm A');
            return aTime - bTime;
        });
    
        // Check if slots are continuous (1 hour apart)
        const isContinuous = updatedSlots.every((slot, index, arr) => {
            if (index === 0) return true;
            const prev = dayjs(arr[index - 1], 'hh:mm A');
            const curr = dayjs(slot, 'hh:mm A');
            return curr.diff(prev, 'hour') === 1;
        });
    
        if (isContinuous) {
            setSelectedSlots(updatedSlots);
        }
    };

    const handleSelectedDate = (item) => {
        setSelectedDate(item);
        const date = `${item.year}-${item.month}-${item.date}`;
        setGetSelectDate(date);
    };

    const handleBookSlot = () => {
        const token = localStorage.getItem('access-token');
        if (!token) {
            navigate('/login');
            return;
        }   

        const bookingDetails = {
            boxId: boxesData.id,
            turfId: boxesData?.turfs[activeTurfIndex]?.id, // 👈 Add Turf ID here
            startTime: selectedSlots[0],
            endTime: selectedSlots.at(-1),
            date: `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`
        };

        setBookingData(bookingDetails);

        if (bookingDetails.startTime && bookingDetails.endTime && bookingDetails.date) {
            ADD_BOOKING(bookingDetails)
                .then((res) => {
                    if (res.data.status) {
                        navigate(`/payment/${res.data.newBooking?.id}`);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        const turfId = boxesData?.turfs?.[activeTurfIndex]?.id;
        if (turfId) {
            setGetTurfId(turfId);
        }
    }, [activeTurfIndex, boxesData, setGetTurfId]);
    return (
        <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Book Your Slot
            </Typography>

            <Container maxWidth="xl">
                {/* Date Selection */}
                <Grid container spacing={1} sx={{ mb: 3 }}>
                    {generateDates().map((item) => (
                        <Grid item key={item.date}>
                            <Button
                                variant={selectedDate.date === item.date ? 'contained' : 'outlined'}
                                sx={{
                                    backgroundColor: selectedDate.date === item.date ? '#228b22' : 'transparent',
                                    color: selectedDate.date === item.date ? '#fff' : '#000',
                                    minWidth: '70px',
                                    borderColor: '#228b22'
                                }}
                                onClick={() => handleSelectedDate(item)}
                            >
                                {item.day} <br /> {item.date}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                {/* Turf Tabs */}
                {boxesData?.turfs?.length > 1 && (
                   <Tabs
                   value={activeTurfIndex}
                   onChange={(e, newValue) => setActiveTurfIndex(newValue)}
                   variant="scrollable"
                   scrollButtons="auto"
                   aria-label="Turf Tabs"
                   sx={{
                       mb: 3,
                       '& .MuiTabs-flexContainer': {
                           gap: '10px',
                       }
                   }}
               >
                   {boxesData?.turfs.map((turf, index) => (
                       <Tab
                           key={index}
                           label={turf.turfname}
                           sx={{
                               textTransform: 'none',
                               padding: '10px 20px',
                               borderRadius: '20px',
                               minHeight: 'auto',
                               minWidth: 'auto',
                               height: 'auto',
                               border: '1px solid #228b22',
                               backgroundColor: activeTurfIndex === index ? '#228b22' : 'transparent',
                               color: activeTurfIndex === index ? '#fff' : '#000',
                               fontWeight: 'bold',
                               '&.Mui-selected': {
                                   color: '#fff',
                                   backgroundColor: '#228b22'
                               }
                           }}
                       />
                   ))}
               </Tabs>
                )}

                {/* Active Turf Slot Display */}
                {boxesData?.turfs?.length > 0 && (
                    <Box sx={{ textAlign: 'left' }}>
                       { boxesData?.turfs?.length == 1 && 
                        <Button
                            variant="contained"
                            onClick={handleBookSlot}
                            sx={{
                                width: 'auto',
                                padding: '10px 20px',
                                height: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                                backgroundColor: '#228b22',
                                border: '1px solid #228b22',
                                borderRadius: '20px',
                                color: '#fff'
                            }}
                        >
                            {boxesData?.turfs[activeTurfIndex].turfname}
                        </Button>}


                        <Grid container spacing={1}>
                            {boxesData?.turfs[activeTurfIndex].turfSlots.map((time, index) => {
                                const currentSlotTime = dayjs(time, 'hh:mm A');
                                const nextSlotTime = currentSlotTime.add(1, 'hour').format('hh:mm A');
                                const currentSlotFormatted = currentSlotTime.format('HH:mm:ss');

                                const isDisabled = slotData?.some((slot) => {
                                    const slotStartTime = slot.startTime;
                                    const slotEndTime = slot.endTime;
                                    return currentSlotFormatted >= slotStartTime && currentSlotFormatted <= slotEndTime;
                                });

                                return (
                                    <Grid item xs={4} sm={3} md={2} key={index}>
                                        <Button
                                            variant={selectedSlots.includes(time) ? 'contained' : 'outlined'}
                                            disabled={isDisabled}
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
                                        <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px', color: 'forestgreen' }}>
                                            {time} - {nextSlotTime}
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* Book Now Button */}
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        variant="contained"
                        onClick={handleBookSlot}
                        sx={{
                            width: '200px',
                            height: '50px',
                            marginTop: '20px',
                            backgroundColor: '#228b22'
                        }}
                    >
                        Book Now
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default BookingSlots;


