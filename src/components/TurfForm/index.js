import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Box,
    Chip,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";

const slotOptions = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM',
    '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
    '10:00 PM', '11:00 PM', '12:00 AM'
];// Define selectable slots

const TurfForm = ({ open, onClose, onSubmit, boxId }) => {
    const [turfs, setTurfs] = useState([
        { turfname: "", turfSlots: [], id: Date.now() }
    ]); // Initial single form entry

    // Handle Input Change for Turf Name
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTurfs = [...turfs];
        updatedTurfs[index][name] = value;
        setTurfs(updatedTurfs);
    };

    // Handle Turf Slot Selection
    const handleSlotChange = (index, selectedSlots) => {
        const updatedTurfs = [...turfs];
        updatedTurfs[index].turfSlots = selectedSlots;
        setTurfs(updatedTurfs);
    };

    // Add a new Turf Entry
    const handleAddTurf = () => {
        setTurfs([...turfs, { turfname: "", turfSlots: [], id: Date.now() }]);
    };

    // Remove a Turf Entry
    const handleRemoveTurf = (index) => {
        if (turfs.length === 1) {
            toast.error("At least one Turf is required");
            return;
        }
        setTurfs(turfs.filter((_, i) => i !== index));
    };

    // Submit All Turfs
    const handleSubmit = () => {
        const validTurfs = turfs.map(({ id, ...turf }) => ({
            ...turf,
            boxId, // Ensure boxId is included
        }));
    
        if (validTurfs.some((turf) => !turf.turfname.trim())) {
            toast.error("Each Turf must have a name.");
            return;
        }
        if (validTurfs.some((turf) => turf.turfSlots.length === 0)) {
            toast.error("Each Turf must have at least one slot.");
            return;
        }
    
        onSubmit(validTurfs);
        onClose();
    };
    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Turf</DialogTitle>
            <DialogContent>
                {turfs.map((turf, index) => (
                    <Box key={turf.id} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <TextField
                                label="Turf Name"
                                name="turfname"
                                fullWidth
                                margin="dense"
                                value={turf.turfname}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <IconButton color="error" onClick={() => handleRemoveTurf(index)}>
                                <Delete />
                            </IconButton>
                        </Box>

                        {/* Multi-Select Slot Dropdown */}
                        <FormControl fullWidth>
                                <InputLabel>Slots</InputLabel>
                                <Select
                                    multiple
                                    value={turf.turfSlots}
                                    onChange={(e) => handleSlotChange(index, e.target.value)}
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
                    </Box>
                ))}

                {/* Add Another Turf Button */}
                <Button
                    onClick={handleAddTurf}
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    startIcon={<Add />}
                >
                    Add Another Turf
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TurfForm;
