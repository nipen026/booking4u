import React, { useState } from 'react';
import {
    Box, Button, Card, Container, FormControlLabel, Grid, TextField, Typography,
    FormLabel, RadioGroup, Radio, CircularProgress, Backdrop
} from '@mui/material';
import { FaRupeeSign, FaCalendarAlt, FaUser } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from 'dayjs';
import { ADD_PAYMENT, VERIFY_PAYMENT } from '../../Api/post';
import { useNavigate } from 'react-router-dom';
dayjs.extend(customParseFormat);

const Payment = ({ boxData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        paymentMethod: "prepaid",
    });
    const [loading, setLoading] = useState(false); // Loader state
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const startTime = dayjs(boxData.Slot.startTime, "HH:mm:ss");
    const endTime = dayjs(boxData.Slot.endTime, "HH:mm:ss").add(1, "hour");
    const totalHours = endTime.diff(startTime, "hour");
    const totalAmount = totalHours * boxData?.Box?.pricePerHour + 10;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: value ? "" : prev[name] }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Enter a valid email address";

        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
        else if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Enter a valid 10-digit phone number";

        if (!formData.paymentMethod) newErrors.paymentMethod = "Select a payment method";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Start loading

        try {
            const paymentData = {
                ...formData,
                bookingId: boxData.id,
                amount: totalAmount,
            };

            const orderResponse = await ADD_PAYMENT(paymentData);
            if (!orderResponse || !orderResponse.data) {
                throw new Error("Failed to create order");
            }

            const order = orderResponse.data.data;

            const options = {
                key: "rzp_test_OQTPNvPZpoAUvm",
                amount: order.amount,
                currency: order.currency,
                name: boxData?.Box?.name,
                description: "booking4u.in",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyData = {
                            order_id: order.id,
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                            bookingId: boxData.id,
                        };

                        const verifyRes = await VERIFY_PAYMENT(verifyData);
                        if (verifyRes.data.status) {
                            navigate('/bookings');
                        } else {
                            console.log("❌ Payment Failed!");
                        }
                    } catch (error) {
                        console.error("Verification Error:", error);
                        alert("Payment verification failed! Please try again.");
                    } finally {
                        setLoading(false); // Stop loading
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: "#228b22",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("❌ Payment failed! Please try again.");
            setLoading(false); // Stop loading
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Full Page Loader */}
            <Backdrop open={loading} sx={{ color: '#fff', zIndex: 9999 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold" align='left'>Booking Summary</Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }} align='left'><strong>{boxData?.Box?.name}</strong></Typography>
                        <Typography sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: 1 }}>
                            <FaCalendarAlt />
                            Check-in: {dayjs(boxData.Slot.date).format("DD MMM YYYY")}
                            <span style={{ fontWeight: 'bold' }}>{startTime.format("hh:mm A")}</span>
                        </Typography>
                        <Typography sx={{ display: 'flex', gap: '10px', alignItems: 'center', mt: 1 }}>
                            <FaCalendarAlt />
                            Check-out: {dayjs(boxData.Slot.date).format("DD MMM YYYY")}
                            <span style={{ fontWeight: 'bold' }}>{endTime.format("hh:mm A")}</span>
                        </Typography>
                    </Card>

                    <Card sx={{ p: 3 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                margin="normal"
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                            <FormLabel component="legend" sx={{ mt: 2, fontWeight: "bold", textAlign: 'left' }}>
                                Select Payment Method
                            </FormLabel>
                            <RadioGroup value={formData.paymentMethod} onChange={handleChange} name="paymentMethod">
                                <FormControlLabel value="prepaid" control={<Radio />} label="(UPI, Net Banking, Card, Credit Card)" />
                                <FormControlLabel value="box" control={<Radio />} label="Pay on Box" />
                            </RadioGroup>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>Price Details</Typography>
                        <Typography>Box Charges: ₹{boxData?.Box?.pricePerHour} x {totalHours}</Typography>
                        <Typography>Platform Fees: ₹10</Typography>
                        <Typography variant="h6" fontWeight="bold" mt={2}>Total Amount: ₹{totalAmount}</Typography>
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, background: '#228b22' }} onClick={handleSubmit}>
                            Pay ₹{totalAmount}
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Payment;
