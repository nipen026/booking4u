import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import { GET_USER } from '../Api/getApi';
import { UPDATE_USER } from '../Api/api';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

const MyProfile = () => {
    const [profileId,setProfileId] = useState()
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        country: '',
        state: '',
        role: '',
    });

    // Fetch user data
    const getUser = () => {
        GET_USER().then((res) => {
            const userData = res.data;
            setProfileId(res.data.id)
            setProfile({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phone: userData.phone || '',
                dob: userData.dob || '',
                country: userData.country || '',
                state: userData.state || '',
                role: userData.role || ''
            });
        }).catch((err) => {
            console.error('Error fetching user data:', err);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const updateUser =  () =>{
        
        UPDATE_USER(profileId,profile).then((res)=>{
            console.log(res);
            toast.success('Successfully Updated')
            getUser();
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', bgcolor: '#f9f9f9', borderRadius: 3 }}>
            <Toaster/>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Account Preferences
            </Typography>

            <Grid container spacing={3}>
                {/* Profile Picture Section */}
                {/* <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <Avatar
                        alt="Profile Picture"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 100, height: 100 }}
                    />
                    <Button variant="outlined" fullWidth>Change</Button>
                    <Button variant="outlined" color="error" fullWidth>Remove</Button>
                </Grid> */}

                {/* Form Fields */}
                <Grid item xs={12} md={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={profile.dob}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Country"
                                name="country"
                                value={profile.country}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="State"
                                name="state"
                                value={profile.state}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Role"
                                name="role"
                                value={profile.role}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
                            <Button variant="outlined" color="error">Cancel</Button>
                            <Button variant="contained" color="primary" onClick={()=>updateUser(profile)}>Update</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MyProfile;
