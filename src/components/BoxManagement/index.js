import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel"; // Install: npm install react-material-ui-carousel
import { GET_BOX_BY_USER } from "../../Api/get";
import { ADD_BOX, ADD_TURF, UPDATE_BOX } from "../../Api/post";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import TurfForm from "../TurfForm";

const BoxManagement = () => {
    const [boxes, setBoxes] = useState([]);
    const [open, setOpen] = useState(false);
    const [boxesData, setBoxesData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editDataId, setEditDataId] = useState()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const facilitiesOptions = [
        'Pitch', 'kit', 'Parking', 'First Aid', 'Wi-Fi', 'Canteen', 'Washroom', 'Drinking Water'
    ];
    const slotOptions = [
        '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM',
        '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
        '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
        '10:00 PM', '11:00 PM', '12:00 AM'
    ];
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        pricePerHour: "",
        discountPrice: "",
        details: "",
        facilities: [],
        slots: null,
        googleMapLink: "",
        landmark: "",
        state: "",
        city: "",
        images: [],
    });
    const [openTurfForm, setOpenTurfForm] = useState(false);
    const [selectedBoxId, setSelectedBoxId] = useState(null);
    const [turfForm, setTurfForm] = useState({
        turfname: "",
        turfSlots: [],
    });
    const [slotInput, setSlotInput] = useState("");
    // Open Dialog
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEdit(false)
        setFormData({
            name: "",
            location: "",
            pricePerHour: "",
            discountPrice: "",
            details: "",
            facilities: [],
            slots: null,
            googleMapLink: "",
            landmark: "",
            state: "",
            city: "",
            images: [],
        });
    };

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        if (files.length > 0) {
            setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
        }
    };

    // Add Box
    const handleSubmit = () => {
        setBoxes([...boxes, { ...formData, id: Date.now() }]);
        const boxData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'images') {
                // Ensure `images` is always an array
                const imagesArray = Array.isArray(value) ? value : value ? [value] : [];

                imagesArray.forEach((image) => {
                    if (typeof image === 'string') {
                        // If image is a URL (existing image)
                        boxData.append('images', image);
                    } else if (image instanceof File) {
                        // If image is a new file
                        boxData.append('images', image);
                    }
                });
            } else if (key === 'facilities') {
                // Ensure facilities and slots are treated as arrays
                const arrayValue = Array.isArray(value) ? value : value ? [value] : [];
                boxData.append(key, JSON.stringify(arrayValue));
            } else {
                boxData.append(key, value);
            }
        });
        if (edit) {

            UPDATE_BOX(editDataId, formData)
                .then((res) => {
                    toast.success('Update Successfully');
                    getBoxByUser()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            ADD_BOX(boxData)
                .then((res) => {
                    toast.success('Added Successfully');
                    getBoxByUser();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setFormData({
            name: '',
            location: '',
            pricePerHour: '',
            discountPrice: '',
            details: '',
            facilities: [],
            slots: null,
            googleMapLink: '',
            landmark: '',
            state: '',
            city: '',
            images: []
        });
        handleClose();
    };

    // Delete Box
    const handleDelete = (id) => {
        setBoxes(boxes.filter((box) => box.id !== id));
    };
    const handleFacilitiesChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, facilities: typeof value === 'string' ? value.split(',') : value });
    };
    const handleSlotChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, slots: typeof value === 'string' ? value.split(',') : value });
    };
    useEffect(() => {
        getBoxByUser();
    }, [])
    const getBoxByUser = () => {
        GET_BOX_BY_USER().then((res) => {
            setBoxesData(res.data.boxes);

        }).catch((err) => {
            console.log(err);
        })
    }
    const handleUpdate = (box) => {
        setEditDataId(box.id)
        setFormData(box);
        setOpen(true);
        setEdit(true)
    }

    // Handle Turf Form Submission


    const handleTurfSubmit = async (turfs) => {
        try {
            // Send the turfs data to your API (Replace with actual API call)
            console.log("Submitting Turfs: ", turfs);
            ADD_TURF(turfs).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            // Show success toast
            toast.success("Turfs Added Successfully");

            // Close form
            setOpenTurfForm(false);
        } catch (error) {
            console.error("Error adding turf:", error);
            toast.error("Failed to add turfs");
        }
    };


    return (
        <Container maxWidth={'2xl'}>
            <Toaster />
            <Box sx={{ p: 3 }}>
                {/* Add Box Button */}
                <Box sx={{ display: "flex", justifyContent: 'start' }}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpen}
                        sx={{ mb: 2, background: '#228b22' }}
                    >
                        Add Box
                    </Button>
                </Box>

                {/* Box List in Cards */}
                <Grid container spacing={3}>
                    {boxesData?.map((box) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={box.id}>
                            <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                                {box.images.length > 0 ? (
                                    <Carousel indicators={false} activeIndicatorIconButtonProps={false} autoPlay={true}>
                                        {box.images.map((image, index) => (
                                            <CardMedia key={index} component="img" height="160" image={`${process.env.REACT_APP_BASE_URL}${image}`} alt={`Image ${index + 1}`} />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <CardMedia component="img" height="160" image="/assets/images/default-box.jpg" alt="Default" />
                                )}
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {box.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {box.location}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', mt: 1 }}>
                                        {box?.facilities.map((item, index) => {
                                            return (
                                                <Typography variant="body2" sx={{ fontWeight: '700' }} color="text.secondary">
                                                    {item}
                                                </Typography>
                                            )
                                        })}
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', my: 1 }}>
                                        {box.turfs.map((item, index) => (
                                            <Box key={index}>
                                                <Typography variant="body2" sx={{ fontWeight: '700' }} color="text.secondary">
                                                    {item.turfname}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: '700' }} color="text.secondary">
                                                    {item.turfSlots.join(' ')}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Typography variant="body2">
                                        <strong>Price:</strong> ₹{box.pricePerHour} /hr
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/slots/${box.id}`}>
                                        <IconButton color="success">
                                            <Visibility />
                                        </IconButton>
                                    </Link>
                                    <IconButton color="primary" onClick={() => handleUpdate(box)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(box.id)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => {
                                        setSelectedBoxId(box.id);
                                        setOpenTurfForm(true);
                                    }}>
                                        <Add />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Add Box Dialog */}
                <Dialog open={open} onClose={handleClose} fullWidth={fullScreen} maxWidth="sm">
                    <DialogTitle>{edit ? 'Update Box' : 'Add New Box'}</DialogTitle>
                    <DialogContent>
                        <TextField label="Name" name="name" fullWidth margin="dense" defaultValue={formData.name} onChange={handleChange} />
                        <TextField label="Location" name="location" fullWidth margin="dense" defaultValue={formData.location} onChange={handleChange} />
                        <TextField label="Price Per Hour" name="pricePerHour" fullWidth margin="dense" defaultValue={formData.pricePerHour} onChange={handleChange} />
                        <TextField label="Discount Price" name="discountPrice" fullWidth margin="dense" defaultValue={formData.discountPrice} onChange={handleChange} />
                        <TextField label="Details" name="details" fullWidth margin="dense" defaultValue={formData.details} onChange={handleChange} />
                        <Grid item xs={12} mt={2}>
                            <FormControl fullWidth>
                                <InputLabel>Facilities</InputLabel>
                                <Select
                                    multiple
                                    value={formData.facilities}
                                    onChange={handleFacilitiesChange}
                                    input={<OutlinedInput label="Facilities" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {facilitiesOptions.map((facility) => (
                                        <MenuItem key={facility} value={facility}>
                                            {facility}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} my={2}>
                            <FormControl fullWidth>
                                <InputLabel>Slots</InputLabel>
                                <Select
                                    multiple
                                    value={formData.slots} // Ensure this is an array
                                    onChange={handleSlotChange}
                                    input={<OutlinedInput label="Slots" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {slotOptions.map((slot) => (
                                        <MenuItem key={slot} value={slot}>
                                            {slot}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <TextField label="Google Map Link" name="googleMapLink" fullWidth margin="dense" defaultValue={formData.googleMapLink} onChange={handleChange} />
                        <TextField label="Landmark" name="landmark" fullWidth margin="dense" defaultValue={formData.landmark} onChange={handleChange} />
                        <TextField label="State" name="state" fullWidth margin="dense" defaultValue={formData.state} onChange={handleChange} />
                        <TextField label="City" name="city" fullWidth margin="dense" defaultValue={formData.city} onChange={handleChange} />
                        {/* File Upload */}
                        {edit ? '' : (
                            <>
                                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                    Upload Images
                                    <input
                                        type="file"
                                        multiple
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </Button>

                                {/* Display Image Previews Directly from Files */}
                                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {formData.images.map((file, index) => (
                                        <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${index}`}
                                                width="80"
                                                height="80"
                                                style={{ borderRadius: 8, objectFit: 'cover' }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="success">
                            {edit ? 'Update Box' : 'Add Box'}
                        </Button>
                    </DialogActions>
                </Dialog>
                <TurfForm
                    open={openTurfForm}
                    onClose={() => setOpenTurfForm(false)}
                    onSubmit={handleTurfSubmit}
                    boxId={selectedBoxId}
                />
            </Box>
        </Container>
    );
};

export default BoxManagement;
