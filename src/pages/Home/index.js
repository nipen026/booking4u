import { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material"; // Loader Components
import Banner from "../../common/Banner";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BookingCTA from "../../components/BookingCTA";
import PopularCricket from "../../components/PopularCricket";
import Testimonials from "../../components/Testimonial";
import WhyChooseBooking4U from "../../components/WhyChooseBooking4U";
import WhyChooseUs from "../../components/WhyChooseUs";
import Loader from "../../common/Loader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay (e.g., API call, data fetching)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5s for better user experience

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    if (loading) {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <Header />
            <Banner />
            <PopularCricket />
            <WhyChooseUs />
            <WhyChooseBooking4U />
            <Testimonials />
            <BookingCTA />
            <Footer />
        </>
    );
};

export default Home;
