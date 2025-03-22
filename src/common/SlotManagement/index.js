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
import { GET_BOX_BY_USER, GET_SLOTS_BY_BOX } from '../../Api/get';

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
    const [boxesData, setBoxesData] = useState([])
    const [formData, setFormData] = useState({
        boxId: '',
        startTime: '',
        endTime: '',
        date: '',
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
    const [errors, setErrors] = useState({});
    const location = useLocation();
    console.log(location);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validation Function
    const validateForm = () => {
        const newErrors = {};

        // Required Field Validation
        if (!formData.boxId) newErrors.boxId = 'Box ID is required';
        if (!formData.startTime) newErrors.startTime = 'Start Time is required';
        if (!formData.endTime) newErrors.endTime = 'End Time is required';
        if (!formData.date) newErrors.date = 'Date is required';

        // Time Validation
        const startIndex = timeSlots.indexOf(formData.startTime);
        const endIndex = timeSlots.indexOf(formData.endTime);

        if (startIndex >= endIndex) {
            newErrors.endTime = 'End Time must be later than Start Time';
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
                console.log(res);
                // window.location.reload()
                toast.success('Update Successfully')
                getSlotData();
            }).catch((err) => {
                console.log(err);

            })
        } else {
            ADD_SLOT(formData).then((res) => {
                console.log(res);
                getSlotData()
            }).catch((err) => {
                console.log(err);

            })
        }

        setFormData({
            boxId: '',
            startTime: '',
            endTime: '',
            date: '',
        });
        setOpenPopup(false);
    };

    // Handle Delete Slot
    const handleDelete = (index) => {
        const updatedSlots = slotsData.filter((_, i) => i !== index);
        setSlotsData(updatedSlots);
    };
    useEffect(() => {
        // console.log();
        GET_BOX_BY_USER().then((res) => {
            console.log(res);
            setBoxesData(res.data.boxes)
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    const getSlotData = () => {
        const id = location.pathname.split('/')[2]
        GET_SLOTS_BY_BOX(id).then((res) => {
            console.log(res);
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
    return (
        <Container sx={{ my: 3 }} maxWidth={'2xl'}>
            <Box>
                <Toaster />
                {/* Add Slot Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
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
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredSlots.map((slot, index) => (
                                <TableRow key={index}>
                                    <TableCell>{slot.id}</TableCell>
                                    <TableCell>{slot.boxId}</TableCell>
                                    <TableCell>{formatTimeTo12Hour(slot.startTime)}</TableCell>
                                    <TableCell>{formatTimeTo12Hour(slot.endTime)}</TableCell>
                                    <TableCell>{slot.date}</TableCell>
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


                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.startTime}>
                                    <InputLabel>Box</InputLabel>
                                    <Select
                                        name="boxId"
                                        value={formData.boxId}
                                        onChange={handleChange}
                                    >
                                        {boxesData.map((time) => (
                                            <MenuItem key={time.id} value={time.id}>
                                                {time.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.startTime}</FormHelperText>
                                </FormControl>
                            </Grid>

                            {/* Start Time Dropdown */}
                            <Grid item xs={6}>
                                <FormControl fullWidth error={!!errors.startTime}>
                                    <InputLabel>Start Time</InputLabel>
                                    <Select
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    >
                                        {timeSlots.map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.startTime}</FormHelperText>
                                </FormControl>
                            </Grid>

                            {/* End Time Dropdown */}
                            <Grid item xs={6}>
                                <FormControl fullWidth error={!!errors.endTime}>
                                    <InputLabel>End Time</InputLabel>
                                    <Select
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    >
                                        {timeSlots.map((time) => (
                                            <MenuItem key={time} value={time}>
                                                {time}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors.endTime}</FormHelperText>
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
