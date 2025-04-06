import React, { useState } from 'react';
import {
    Box, Typography, Button, Card, CardContent, Grid, Chip, Dialog,
    DialogTitle, DialogContent, DialogActions, IconButton, TextField,
    Select,
    InputLabel,
    FormControl,
    MenuItem
} from '@mui/material';
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


const AdminAllBookings = ({ bookingsData }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [exportDialog, setExportDialog] = useState(false);
    const [exportType, setExportType] = useState('');
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate()

    // Open Dialog with booking details
    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setOpenDialog(true);
    };

    // Close Dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedBooking(null);
    };

    // Open Export Dialog
    const handleOpenExportDialog = (type) => {
        setExportType(type);
        setExportDialog(true);
    };

    // Close Export Dialog
    const handleCloseExportDialog = () => {
        setExportDialog(false);
        setDateRange({ startDate: '', endDate: '' });
    };

    // Handle Export Logic
    const handleExport = () => {
        const { startDate, endDate } = dateRange;
    
        // Convert dates to dayjs objects for comparison
        const start = dayjs(startDate);
        const end = dayjs(endDate);
    
        // Validate that the difference is at least 3 days
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
    
        if (end.diff(start, 'day') < 3) {
            alert("Please select a date range of at least 3 days.");
            return;
        }
    
        // Proceed with export if validation passes
        const data = {
            exportType: exportType,
            startDate: startDate,
            endDate: endDate
        };
    
        navigate('/sheet', { state: data });
        
        handleCloseExportDialog();
    }; 
    const handleSelectRange = (range) => {
        const today = dayjs();
        let start, end;
    
        switch (range) {
            case "This Week":
                start = today.startOf('week');
                end = today.endOf('week');
                break;
            case "Two Weeks":
                start = today.startOf('week');
                end = today.add(13, 'day');
                break;
            case "Three Weeks":
                start = today.startOf('week');
                end = today.add(20, 'day');
                break;
            case "This Month":
                start = today.startOf('month');
                end = today.endOf('month');
                break;
            default:
                start = today;
                end = today;
        }
    
        setDateRange({
            startDate: start.format("YYYY-MM-DD"),
            endDate: end.format("YYYY-MM-DD")
        });
    };
    return (
        <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
                All Bookings
            </Typography>

            {/* Export Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button variant="contained" sx={{background:'forestgreen',color:'white'}} onClick={() => handleOpenExportDialog('Bookings')}>
                    Export Bookings
                </Button>
            </Box>

            {/* Booking Cards */}
            {bookingsData.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <img 
                        src="/assets/images/not-booked.png" 
                        alt="No Bookings" 
                        style={{ width: '250px', marginBottom: '20px' }} 
                    />
                    <Typography variant="h6" fontWeight="bold">
                        No Bookings Found
                    </Typography>
                </Box>
            ) : (
                bookingsData.filter((obj)=>obj.status !== 'Cancelled').map((booking, index) => {
                    const startTime = dayjs(booking?.Slot?.startTime, "HH:mm:ss");
                    const endTime = dayjs(booking?.Slot?.endTime, "HH:mm:ss").add(1, "hour");

                    return (
                        <Card key={index} sx={{ mb: 2, p: 2 }}>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" fontWeight="bold" align='left'>
                                            {booking?.Box?.name} 
                                        </Typography>
                                        <Typography sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <FaCalendarAlt style={{ marginRight: '8px' }} />
                                            {dayjs(booking?.Slot?.date).format("DD MMM YYYY")}
                                            <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                                                {startTime?.format("hh:mm A")} - {endTime?.format("hh:mm A")}
                                            </span>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mt={1} align='left'>
                                            Booking ID: {booking?.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mt={1} align='left' sx={{textTransform:'capitalize'}}>
                                            {booking?.Turf?.turfname}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mt={1} align='left' sx={{textTransform:'capitalize'}}>
                                            Payment : {booking?.payment}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mt={1} align='left'>
                                            Price: {booking?.price}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                                        <Chip
                                            label={booking?.status}
                                            sx={{
                                                backgroundColor: booking?.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: booking?.status === 'Confirmed' ? 'green' : 'red',
                                                fontWeight: 'bold',
                                                borderRadius: '6px'
                                            }}
                                        />
                                        <IconButton color="primary" onClick={() => handleViewDetails(booking)}>
                                            <FaEye />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })
            )}

            {/* Booking Details Dialog */}
            {selectedBooking && (
                <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogContent>
                        <Typography variant="h6" mt={2} fontWeight="bold">{selectedBooking?.Box?.name}</Typography>
                        <Typography mt={2}>
                            <FaCalendarAlt style={{ marginRight: '8px' }} />
                            {dayjs(selectedBooking?.Slot?.date).format("DD MMM YYYY")}
                        </Typography>
                        <Typography mt={2}>
                            Check-in: <strong>{dayjs(selectedBooking?.Slot?.startTime, "HH:mm:ss").format("hh:mm A")}</strong>
                        </Typography>
                        <Typography mt={2}>
                            Check-out: <strong>{dayjs(selectedBooking?.Slot?.endTime, "HH:mm:ss").add(1, "hour").format("hh:mm A")}</strong>
                        </Typography>
                        <Typography variant="body2" mt={2}>
                            Booking ID: <strong>{selectedBooking?.id}</strong>
                        </Typography>
                        <Typography variant="body2" mt={2}>
                            User Name: <strong>{selectedBooking?.User?.firstName} {selectedBooking?.User?.lastName}</strong>
                        </Typography>
                        <Typography variant="body2" mt={2}>
                            Email: <strong>{selectedBooking?.User?.email}</strong>
                        </Typography>
                        <Typography variant="body2" mt={2}>
                            Phone: <strong>{selectedBooking?.User?.phone}</strong>
                        </Typography>
                        <Typography variant="body2" mt={2}>
                            Status: <strong>{selectedBooking?.status}</strong>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Export Dialog */}
            <Dialog open={exportDialog} onClose={handleCloseExportDialog} fullWidth maxWidth="sm">
                <DialogTitle>Export {exportType}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="range-select-label">Select Range</InputLabel>
                    <Select
                        labelId="range-select-label"
                        value={dateRange.label}
                        label="Select Range"
                        onChange={(e) => handleSelectRange(e.target.value)}
                    >
                        <MenuItem value="This Week">This Week</MenuItem>
                        <MenuItem value="Two Weeks">Two Weeks</MenuItem>
                        <MenuItem value="Three Weeks">Three Weeks</MenuItem>
                        <MenuItem value="This Month">This Month</MenuItem>
                    </Select>
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExportDialog}  sx={{border:'1px solid forestgreen',background:'white',color:'forestgreen'}}>
                        Cancel
                    </Button>
                    <Button onClick={handleExport} sx={{background:'forestgreen',color:'white'}} variant="outlined">
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminAllBookings;
