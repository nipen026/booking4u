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
import { GET_ALL_BOX } from "../../Api/get";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [boxesData, setBoxesData] = useState([]);

    // Combined Effect for Loading and Data Fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GET_ALL_BOX();
                setBoxesData(res.data); // Assuming data structure matches
            } catch (error) {
                console.error('Error fetching boxes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Header />
            <Banner />
            <PopularCricket boxesData={boxesData} />
            <WhyChooseUs />
            <WhyChooseBooking4U />
            <Testimonials />
            <BookingCTA />
            <Footer />
        </>
    );
};

export default Home;
