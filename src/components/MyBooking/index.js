import React, { useState } from 'react';
import {
    Box, Typography, Button, Card, CardContent, Grid, Chip, TextField, Dialog,
    DialogTitle, DialogContent, DialogActions, Backdrop, CircularProgress
} from '@mui/material';
import { FaCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import { CANCEL_BOOKING } from '../../Api/post';

const MyBookings = ({ boxesData }) => {
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleCancelClick = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBookingId(null);
    };

    const handleConfirmCancel = async () => {
        setLoading(true); // Start loading
        try {
            await CANCEL_BOOKING(selectedBookingId);
            window.location.reload();
        } catch (error) {
            console.error("Error cancelling booking:", error);
        } finally {
            setLoading(false); // Stop loading
            handleCloseDialog();
        }
    };

    return (
        <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                My Bookings
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Manage your upcoming and past reservations
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ mb: 3, width: '300px', textAlign: 'right' }}
                />
            </Box>

            {boxesData.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <img src="/assets/images/not-booked.png" alt="No Bookings"
                        style={{ width: '250px', marginBottom: '20px' }} />
                    <Typography variant="h6" fontWeight="bold">
                        No Bookings Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Your upcoming bookings will appear here.
                    </Typography>
                </Box>
            ) : (
                boxesData.map((booking, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" fontWeight="bold" align='left'>
                                        {booking.Box.name} - {booking.Turf.turfname}
                                    </Typography>
                                    <Typography sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: 1 }}>
                                        <FaCalendarAlt />
                                        Check-in: {dayjs(booking.Slot.date).format("DD MMM YYYY")}
                                        <span style={{ fontWeight: 'bold' }}>{dayjs(booking.Slot.startTime, "HH:mm:ss").format("hh:mm A")}</span>
                                    </Typography>

                                    <Typography sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: 1 }}>
                                        <FaCalendarAlt />
                                        Check-out: {dayjs(booking.Slot.date).format("DD MMM YYYY")}
                                        <span style={{ fontWeight: 'bold' }}>{dayjs(booking.Slot.endTime, "HH:mm:ss").add(1, "hour").format("hh:mm A")}</span>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        Booking reference: {booking.id}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                                    <Chip
                                        label={booking.status}
                                        sx={{
                                            backgroundColor: booking.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: booking.status === 'Confirmed' ? 'green' : 'red',
                                            fontWeight: 'bold',
                                            borderRadius: '6px'
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleCancelClick(booking.id)}
                                        disabled={loading}
                                    >
                                        Cancel Booking
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to cancel this booking?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" disabled={loading}>
                        No
                    </Button>
                    <Button onClick={handleConfirmCancel} color="error" disabled={loading}>
                        {loading ? "Cancelling..." : "Yes, Cancel"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Global Loader */}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default MyBookings;
