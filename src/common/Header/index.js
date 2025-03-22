import React, { useState } from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem,
    ListItemText, Menu, MenuItem, Divider, Avatar
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { MdSportsCricket } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { FiUser } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode'
const Header = () => {
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('access-token'));
    const token = localStorage.getItem("access-token");
    const decodedToken = token ? jwtDecode(token) : '';
    const userRole = token ? decodedToken.role : 'user';
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };
    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Venues", path: "/venues" },
        { label: "Bookings", path: "/bookings" },
        { label: "Contact", path: "/contact" },
    ];

    if (token && userRole === "admin") {
        navLinks.push({ label: "My Boxes", path: "/myBox" });
    }

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogOut = () => {
        localStorage.removeItem('access-token');
        window.location.reload()
    }

    return (
        <>
        {location.pathname == '/' ?
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', color: '#228b22', p: 1,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <marquee behavior="scroll" direction="left" style={{ flex: 1, fontSize: '14px', fontWeight: 'bold' }}>
                    Book your cricket venue now! Enjoy hassle-free online booking with instant confirmation. Best venues with premium facilities available at unbeatable prices. Reserve your spot today and experience top-class cricket action with ease!
                </marquee>
               <Link to={'/contact'}>
               <Button variant="contained" sx={{ backgroundColor: '#fff', color: '#228b22', ml: 2, fontWeight: 'bold',boxShadow:'none',letterSpacing:'0.5px' }}>
                    Get a Partner?
                </Button>
                </Link>
            </Box> :''}
            <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 1, top: 0 }}>
                <Toolbar>
                    {/* Logo Section */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}>
                            <MdSportsCricket />
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold' }}
                            >
                                booking<span style={{ color: 'forestgreen' }}>4</span>u.in
                            </Typography>
                        </Link>
                    </Typography>

                    {/* Desktop Navigation Links */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
                        {navLinks.map(({ label, path }, index) => (
                            <Link
                                key={index}
                                to={path}
                                style={{
                                    textDecoration: "none",
                                    color: location.pathname === path ? "forestgreen" : "inherit",
                                    fontWeight: location.pathname === path ? "bold" : "normal",
                                }}
                            >
                                <Button color="inherit">{label}</Button>
                            </Link>
                        ))}
                    </Box>

                    {/* User Dropdown */}
                    <Box>
                        {isLoggedIn ? (
                            <>
                                {/* User Avatar Menu */}
                                <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#228b22' }}>
                                        <FiUser />
                                    </Avatar>
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <Link to={'/myprofile'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
                                    </Link>
                                    <Link to={'/bookings'} style={{ textDecoration: 'none', color: '#000' }}>
                                        <MenuItem onClick={handleMenuClose}>My Bookings</MenuItem>
                                    </Link>
                                    <Divider />
                                    <MenuItem
                                        onClick={() => handleLogOut()}
                                        sx={{ color: 'red', fontWeight: 'bold' }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            // Show Sign In Button if Not Logged In
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                sx={{ backgroundColor: '#228b22', color: '#fff' }}
                            >
                                Sign In
                            </Button>
                        )}
                    </Box>

                    {/* Mobile Menu Icon */}
                    <IconButton
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <BiMenu />
                    </IconButton>

                    {/* Drawer for Mobile Menu */}
                    <Drawer
                        anchor="right"
                        open={openDrawer}
                        onClose={toggleDrawer(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <Box
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}
                            >
                                <Typography variant="h6">Menu</Typography>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <CgClose />
                                </IconButton>
                            </Box>

                            <List>
                                {navLinks.map((link) => (
                                    <ListItem
                                        button
                                        key={link.label}
                                        component={Link}
                                        to={link.path}

                                    >
                                        <ListItemText sx={{ color: '#000' }} primary={link.label} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar></>
    );
};

export default Header;
