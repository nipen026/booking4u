// import React, { useState } from 'react';
// import { Box, Typography, Grid, Button, Container } from '@mui/material';
// import dayjs from 'dayjs'; // For dynamic date generation
// import { useNavigate } from 'react-router-dom';
// import { ADD_BOOKING } from '../../Api/post';
// import customParseFormat from "dayjs/plugin/customParseFormat";

// const generateDates = () => {
//     const today = dayjs();
//     return Array.from({ length: 7 }, (_, index) => ({
//         day: today.add(index, 'day').format('ddd'),
//         date: today.add(index, 'day').format('DD'),
//         month: today.add(index, 'day').format('M'), // Month as number (e.g., 03 for March)
//         year: today.add(index, 'day').format('YYYY')  // Example: 2025
//     }));
// };

// dayjs.extend(customParseFormat);



// const BookingSlots = ({ setGetSelectDate, slotData, boxesData }) => {
//     const [selectedDate, setSelectedDate] = useState(generateDates()[0]);
//     const [selectedSlots, setSelectedSlots] = useState([]);
//     const [bookingData, setBookingData] = useState();
//     const navigate = useNavigate()

//     // Handle Slot Selection for Multiple Slots
//     const handleSlotSelection = (time) => {
//         if (selectedSlots.includes(time)) {
//             setSelectedSlots(selectedSlots.filter(slot => slot !== time)); // Deselect if already selected
//         } else {
//             setSelectedSlots([...selectedSlots, time]); // Add to selected slots
//         }
//     };
//     const handleSelectedDate = (item) => {
//         setSelectedDate(item)
//         const date = `${item.year}-${item.month}-${item.date}`;
//         setGetSelectDate(date);

//     }
//     const handleBookSlot = () => {
//         const token = localStorage.getItem('access-token');
//         if (!token) {
//             navigate('/login')
//         }
//         const bookingDetails = {
//             boxId: boxesData.id,
//             startTime: selectedSlots[0],
//             endTime: selectedSlots.at(-1),
//             date: `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`
//         };

//         setBookingData(bookingDetails);

//         if (bookingDetails.startTime && bookingDetails.endTime && bookingDetails.date) {
//             ADD_BOOKING(bookingDetails).then((res) => {
//                 if (res.data.status) {
//                     navigate(`/payment/${res.data.newBooking?.id}`)
//                 }
//             }).catch((err) => {
//                 console.log((err));
//             })
//         }
//     };


//     return (
//         <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
//             <Typography variant="h5" fontWeight="bold" mb={2}>
//                 Book Your Slot
//             </Typography>

//             {/* Select Date Section */}
//             <Container maxWidth={'xl'} >
//                 <Grid container spacing={1} sx={{ mb: 3 }}>
//                     {generateDates().map((item) => (
//                         <Grid item key={item.date}>
//                             <Button
//                                 variant={selectedDate.date === item.date ? 'contained' : 'outlined'}
//                                 sx={{
//                                     backgroundColor: selectedDate.date === item.date ? '#228b22' : 'transparent',
//                                     color: selectedDate.date === item.date ? '#fff' : '#000',
//                                     minWidth: '70px',
//                                     borderColor: '#228b22'
//                                 }}
//                                 onClick={() => handleSelectedDate(item)}
//                             >
//                                 {item.day} <br /> {item.date}
//                             </Button>
//                         </Grid>
//                     ))}
//                 </Grid>


//                 {/* <Grid container spacing={1}>
//                     {boxesData.slots.map((time, index) => {
//                     const currentSlotTime = dayjs(time, "hh:mm A").format("HH:mm:ss");         // Extract hours from time
//                         const isDisabled = slotData?.some((slot) => {
//                             const slotStartTime = parseInt(slot.startTime.slice(0, 2)); // Extract hours as number (e.g., 07)
//                             const slotEndTime = parseInt(slot.endTime.slice(0, 2));     // Extract hours as number

//                             return currentSlotTime >= slotStartTime && currentSlotTime < slotEndTime;
//                         });

//                         return (
//                             <Grid item xs={4} sm={3} md={2} key={index}>
//                                 <Button
//                                     variant={selectedSlots.includes(time) ? 'contained' : 'outlined'}
//                                     disabled={isDisabled}
//                                     sx={{
//                                         backgroundColor: selectedSlots.includes(time) ? '#228b22' : 'transparent',
//                                         color: selectedSlots.includes(time) ? '#fff' : '#000',
//                                         width: '100%',
//                                         borderColor: '#228b22'
//                                     }}
//                                     onClick={() => handleSlotSelection(time)}
//                                 >
//                                     {time}
//                                 </Button>
//                             </Grid>
//                         );
//                     })}
//                 </Grid> */}

//                 <Grid container spacing={1}>
//                     {boxesData.slots.map((time, index) => {
//                         // Convert 12-hour format time to 24-hour format
//                         const currentSlotTime = dayjs(time, "hh:mm A");
//                         const nextSlotTime = currentSlotTime.add(1, "hour").format("hh:mm A");

//                         const currentSlotFormatted = currentSlotTime.format("HH:mm:ss");

//                         const isDisabled = slotData?.some((slot) => {
//                             const slotStartTime = slot.startTime; // Already in HH:mm:ss
//                             const slotEndTime = slot.endTime; // Already in HH:mm:ss

//                             return currentSlotFormatted >= slotStartTime && currentSlotFormatted <= slotEndTime;
//                         });

//                         return (
//                             <Grid item xs={4} sm={3} md={2} key={index}>
//                                 <Button
//                                     variant={selectedSlots.includes(time) ? "contained" : "outlined"}
//                                     disabled={isDisabled}
//                                     sx={{
//                                         backgroundColor: selectedSlots.includes(time) ? "#228b22" : "transparent",
//                                         color: selectedSlots.includes(time) ? "#fff" : "#000",
//                                         width: "100%",
//                                         borderColor: "#228b22",
//                                     }}
//                                     onClick={() => handleSlotSelection(time)}
//                                 >
//                                     {time}
//                                 </Button>
//                                 {/* Display the time range below the button */}
//                                 <div style={{ textAlign: "center", fontSize: "12px", marginTop: "5px", color: 'forestgreen' }}>
//                                     {time} - {nextSlotTime}
//                                 </div>
//                             </Grid>
//                         );
//                     })}
//                 </Grid>




//                 <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                     <Button
//                         variant={'contained'}
//                         onClick={() => handleBookSlot()}
//                         sx={{
//                             width: '200px',
//                             height: '50px',
//                             margin: '20px 0px 0px 0px',
//                             backgroundColor: '#228b22'
//                         }}
//                     >Book Now</Button>
//                 </Box>
//             </Container>
//             <Box>
//                 <Box sx={{ mt: 4, position: 'relative', width: '100%', mx:'auto', height: { xs: '300px', md: '450px' }, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
//                     <iframe
//                         src={boxesData.googleMapLink}
//                         width="100%"
//                         height="100%"
//                         style={{ border: 0, borderRadius: '8px' }}
//                         allowFullScreen=""
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                     ></iframe>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default BookingSlots;
import React, { useState } from 'react';
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

const BookingSlots = ({ setGetSelectDate, slotData, boxesData }) => {
    const [selectedDate, setSelectedDate] = useState(generateDates()[0]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookingData, setBookingData] = useState();
    const [activeTurfIndex, setActiveTurfIndex] = useState(0);
    const navigate = useNavigate();

    const handleSlotSelection = (time) => {
        if (selectedSlots.includes(time)) {
            setSelectedSlots(selectedSlots.filter(slot => slot !== time));
        } else {
            setSelectedSlots([...selectedSlots, time]);
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
                        </Button>


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


