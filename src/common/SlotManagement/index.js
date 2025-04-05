import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ADD_SLOT, UPDATE_SLOT } from '../../Api/post';
import { GET_BOX_BY_USER, GET_PENDNG_SLOTS, GET_SLOTS_BY_BOX } from '../../Api/get';
import dayjs from 'dayjs';

const timeSlots = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM',
    '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
    '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
];

const SlotsManagement = () => {
    const [slotsData, setSlotsData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [boxesData, setBoxesData] = useState([]);

    const [formData, setFormData] = useState({
        boxId: '',
        turfId: '',
        startTime: '',
        endTime: '',
        date: '',
        firstname: '',
        lastname: '',
        price: '',
        payment: '',
        bookername: '',
        type: 'manual',
        advancepayment: ''
    });
    const [edit, setEdit] = useState(false);
    const [filterDate, setFilterDate] = useState('');

    // Set default filter date to today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        setFilterDate(today);
    }, []);

    const handleFilterDateChange = (e) => {
        setFilterDate(e.target.value);
    };

    // Filter slots by selected date
    const filteredSlots = slotsData.filter(slot =>
        !filterDate || slot.date === filterDate
    );
    const formatTimeTo12Hour = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const hourInt = parseInt(hour, 10);

        const formattedHour = hourInt === 0
            ? '12' // Handle midnight case
            : hourInt > 12
                ? `${hourInt - 12}`.padStart(2, '0')
                : `${hourInt}`.padStart(2, '0');

        const period = hourInt >= 12 ? 'PM' : 'AM';
        return `${formattedHour}:${minute} ${period}`;
    };
    const [pendingSlots, setPendingSlots] = useState([]);
    const [slotsLoaded, setSlotsLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const location = useLocation();

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset start and end time when date is changed
        if (name === 'date') {
            setFormData({ ...formData, [name]: value, startTime: '', endTime: '' });
        }
    };


    // Validation Function
    const validateForm = () => {
        const newErrors = {};

        // Required Field Validation
        if (!formData.boxId) newErrors.boxId = 'Box is required';
        if (!formData.turfId) newErrors.turfId = 'Turf Id is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.firstname) newErrors.firstname = 'First name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.payment) newErrors.payment = 'Payment Method is required';
        if (!formData.bookername) newErrors.bookername = 'Booker name is required';

        // Ensure Start Time and End Time are not selected if Date is empty
        if (!formData.date) {
            newErrors.startTime = 'Select a date first';
            newErrors.endTime = 'Select a date first';
        } else {
            if (!formData.startTime) newErrors.startTime = 'Start Time is required';
            if (!formData.endTime) newErrors.endTime = 'End Time is required';

            if (formData.startTime && formData.endTime) {
                const startIndex = pendingSlots.indexOf(formData.startTime);
                const endIndex = pendingSlots.indexOf(formData.endTime);
            
                if (startIndex === -1 || endIndex === -1) {
                    newErrors.startTime = 'Invalid Start Time';
                    newErrors.endTime = 'Invalid End Time';
                } else if (endIndex < startIndex) {
                    newErrors.endTime = 'End Time must be after or equal to Start Time';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Handle Add Slot
    const handleAddSlot = () => {
        if (!validateForm()) return;

        // setSlotsData([...slotsData, formData]);
        if (edit) {

            UPDATE_SLOT(formData.id, formData).then((res) => {
                toast.success('Update Successfully')
                getSlotData();
            }).catch((err) => {
                console.log(err);

            })
        } else {
            ADD_SLOT(formData).then((res) => {
                getSlotData()
            }).catch((err) => {
                console.log(err);

            })
        }

        setFormData({
            boxId: '',
            turfId: '',
            startTime: '',
            endTime: '',
            date: '',
            firstname: '',
            lastname: '',
            price: '',
            payment: '',
            bookername: '',
            advancepayment: '',
            type: 'manual'
        });
        setOpenPopup(false);
    };

    // Handle Delete Slot
    const handleDelete = (index) => {
        const updatedSlots = slotsData.filter((_, i) => i !== index);
        setSlotsData(updatedSlots);
    };
    useEffect(() => {
        GET_BOX_BY_USER().then((res) => {
            setBoxesData(res.data.boxes)
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    const getSlotData = () => {
        const id = location.pathname.split('/')[2]
        GET_SLOTS_BY_BOX(id).then((res) => {
            setSlotsData(res.data)
        }).catch((err) => {
            console.log(err);

        })
    }

    useEffect(() => {
        getSlotData()
    }, [location.pathname]);


    const handleEditSlot = (slotData) => {
        setEdit(true)
        setFormData({
            ...slotData,
            startTime: formatTimeTo12Hour(slotData.startTime),
            endTime: formatTimeTo12Hour(slotData.endTime)
        });
        setOpenPopup(true);
    };
    const getBookedTimes = () => {
        if (!formData.date || !slotsLoaded) return [];

        return slotsData
            .filter(slot => slot.date === formData.date)
            .flatMap(slot => {
                const startIdx = timeSlots.indexOf(formatTimeTo12Hour(slot.startTime));
                const endIdx = timeSlots.indexOf(formatTimeTo12Hour(slot.endTime));
                return timeSlots.slice(startIdx, endIdx);
            });
    };
    const fetchPendingSlots = async (boxId, date) => {
        if (!date) return;
        const id = location.pathname.split('/')[2]
        setSlotsLoaded(false);
        try {
            const res = await GET_PENDNG_SLOTS(id, date);
            const sortedPendingSlots = timeSlots.filter(slot => res.data.slots.includes(slot));
            setPendingSlots(sortedPendingSlots);
            console.log(sortedPendingSlots);
            
            setSlotsLoaded(true);
        } catch (err) {
            console.error('Error fetching pending slots:', err);
            setSlotsLoaded(true); // still allow UI to respond
        }
    };
    useEffect(() => {
        const boxId = location.pathname.split('/')[2];
        if (formData.date) {
            fetchPendingSlots(boxId, formData.date);
        }
    }, [formData.date]);



    return (
        <Container sx={{ my: 3 }} maxWidth={'2xl'}>
            <Box>
                <Toaster />
                {/* Add Slot Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box >
                        <Button
                            variant="contained"
                            onClick={() => setOpenPopup(true)}
                            sx={{ my: 2, background: 'forestgreen' }}
                        >
                            Add Slot
                        </Button>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Filter by Date"
                            type="date"
                            value={filterDate}
                            onChange={handleFilterDateChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                </Box>

                {/* Table for Slots Data */}
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Slot ID</TableCell>
                                <TableCell>Box ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredSlots.map((slot, index) => (
                                <TableRow key={index}>
                                    <TableCell>{slot.id}</TableCell>
                                    <TableCell>{slot.boxId}</TableCell>
                                    <TableCell>{slot.firstname}</TableCell>
                                    <TableCell>{slot.lastname}</TableCell>
                                    <TableCell>{formatTimeTo12Hour(slot.startTime)}</TableCell>
                                    <TableCell>{dayjs(slot.endTime, "HH:mm:ss").add(1, "hour").format("hh:mm A")}</TableCell>
                                    <TableCell>{slot.date}</TableCell>
                                    <TableCell>{slot.price ? slot.price : ''}</TableCell>
                                    <TableCell>{slot.status}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEditSlot(slot)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Add Slot Popup */}
                <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>{edit ? 'Update Slot' : 'Add Slot'}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="First Name" name="firstname" value={formData.firstname} onChange={handleChange} error={!!errors.firstname} helperText={errors.firstname} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} error={!!errors.lastname} helperText={errors.lastname} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Booker Name" name="bookername" value={formData.bookername} onChange={handleChange} error={!!errors.bookername} helperText={errors.bookername} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.boxId}>
                                    <InputLabel>Box</InputLabel>
                                    <Select name="boxId" value={formData.boxId} onChange={handleChange}>
                                        {boxesData.map((box) => (
                                            <MenuItem key={box.id} value={box.id}>
                                                {box.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.boxId}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.turfId}>
                                    <InputLabel>Turf</InputLabel>
                                    <Select name="turfId" value={formData.turfId} onChange={handleChange}>
                                        {boxesData
                                            ?.find((box) => box.id === Number(formData.boxId)) // Find selected box
                                            ?.turfs?.map((turf) => (
                                                <MenuItem key={turf.id} value={turf.id}>
                                                    {turf.turfname}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <FormHelperText>{errors.turfId}</FormHelperText> {/* Corrected error key */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Price" name="price" value={formData.price} onChange={handleChange} error={!!errors.price} helperText={errors.price} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Advanvce Payment" name="advancepayment" value={formData.advancepayment} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.payment}>
                                    <InputLabel>Payment Method</InputLabel>
                                    <Select name="payment" value={formData.payment} onChange={handleChange}>
                                        <MenuItem value="cash">Cash</MenuItem>
                                        <MenuItem value="prepaid">UPI</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.payment}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    error={!!errors.date}
                                    helperText={errors.date}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            {/* Disable Start and End Time selection if no Date is selected */}
                            <Grid item xs={6}>
                                <FormControl fullWidth error={!!errors.startTime} disabled={!slotsLoaded}>
                                    <InputLabel>Start Time</InputLabel>
                                    <Select name="startTime" value={formData.startTime} onChange={handleChange}>
                                        {pendingSlots.map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.startTime}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth error={!!errors.endTime} disabled={!slotsLoaded}>
                                    <InputLabel>End Time</InputLabel>
                                    <Select name="endTime" value={formData.endTime} onChange={handleChange}>
                                        {pendingSlots.map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.endTime}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpenPopup(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddSlot} variant="contained" sx={{ background: 'forestgreen' }}>
                            {edit ? 'Update Slot' : 'Add Slot'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default SlotsManagement;
