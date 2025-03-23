import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress } from "@mui/material";
import { CONTACT_US } from "../../Api/post";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        message: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loader state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Clear error when user types
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.company.trim()) newErrors.company = "Company name is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true); // Start loading
        try {
            const res = await CONTACT_US(formData);
            setFormData({ name: "", company: "", message: "", phone: "" }); // Reset form
            navigate("/");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 5, mb: 10, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Your Company or Box"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        error={Boolean(errors.company)}
                        helperText={errors.company}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 3 }}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ mb: 2 }}
                        error={Boolean(errors.message)}
                        helperText={errors.message}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading} // Disable when loading
                            sx={{ backgroundColor: "#228b22", ":hover": { backgroundColor: "#1b6e1b" } }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default ContactUs;
