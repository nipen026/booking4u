import React, { useState } from 'react';
import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, Tabs, Tab } from '@mui/material';
import { FaRupeeSign } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState(0);

    const handleChange = (event, newValue) => {
        setPaymentMethod(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Complete Your Payment
            </Typography>

            <Grid container spacing={3}>
                {/* Booking Summary */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h5" sx={{textAlign:'left'}} fontWeight="bold">
                            Booking Summary
                        </Typography>

                        <Typography variant="subtitle1" sx={{ mt: 1, textAlign: 'left' }}>
                            <strong>Luxury Resort & Spa</strong>
                        </Typography>
                        <Typography sx={{ textAlign: 'left',display:'flex',gap:'10px',alignItems:'center',margin:'10px 0px' }}><FaCalendarAlt/> Check-in: Feb 15, 2024</Typography>
                        <Typography sx={{ textAlign: 'left',display:'flex',gap:'10px',alignItems:'center',margin:'10px 0px' }}><FaCalendarAlt/> Check-out: Feb 18, 2024</Typography>
                        <Typography sx={{ textAlign: 'left',display:'flex',gap:'10px',alignItems:'center',margin:'10px 0px' }}><FaUser/> 2 Adults, 1 Room</Typography>

                        <Typography sx={{ mt: 2, textAlign: 'left' }} fontWeight="bold" >
                            Booking Reference: <span style={{ color: '#228b22' }}>BK4U-2024-12345</span>
                        </Typography>
                    </Card>

                    {/* Payment Methods */}
                    <Card sx={{ p: 3 }}>
                        <Tabs value={paymentMethod} onChange={handleChange}>
                            <Tab label="Card" />
                            <Tab label="Net Banking" />
                            <Tab label="UPI" />
                        </Tabs>

                        {/* Card Payment Form */}
                        {paymentMethod === 0 && (
                            <Box sx={{ mt: 2 }}>
                                <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" margin="normal" />
                                <TextField fullWidth label="Cardholder Name" placeholder="Name on card" margin="normal" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Expiry Date" placeholder="MM/YY" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="CVV" placeholder="123" />
                                    </Grid>
                                </Grid>

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Save card for future payments"
                                    sx={{ mt: 1 }}
                                />
                            </Box>
                        )}
                    </Card>
                </Grid>

                {/* Price Details */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Price Details
                        </Typography>
                        <Typography>Room Charges: ₹10,999</Typography>
                        <Typography>Taxes & Fees: ₹1,500</Typography>
                        <Typography variant="h6" fontWeight="bold" mt={2}>
                            Total Amount: ₹12,499
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2,background:'#228b22' }}
                        >
                            Pay ₹12,499
                        </Button>

                        <Typography
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
                            color="text.secondary"
                        >
                            🔒 100% Secure Payment
                        </Typography>
                    </Card>

                    {/* Additional Info */}
                    <Grid  sx={{ mt: 3,display:'flex',gap:'20px' }}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" sx={{ color: '#4CAF50' }}><FaRupeeSign/></Typography>
                                <Typography fontWeight="bold">Price Guarantee</Typography>
                                <Typography variant="caption" textAlign="center">
                                    You're getting the best price available
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" sx={{ color: '#2196F3' }}><BsFillTelephoneFill/></Typography>
                                <Typography fontWeight="bold">24/7 Support</Typography>
                                <Typography variant="caption" textAlign="center">
                                    Get help anytime via chat or call
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    );
};

export default Payment;
