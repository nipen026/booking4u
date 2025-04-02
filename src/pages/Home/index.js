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
import { Helmet } from "react-helmet-async";

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
        <Helmet>
                <title>Book Box Cricket Grounds in Surat | Booking4U</title>
                <meta 
                    name="description" 
                    content="Find and book the best box cricket turfs in Surat with ease. Get instant turf booking with Booking4U and enjoy hassle-free cricket matches!" 
                />
                <meta 
                    name="keywords" 
                    content="Surat Box Cricket, Best Cricket Ground Booking Surat, Turf Booking App, Online Cricket Booking, Surat Cricket Turf" 
                />
                
                {/* ✅ Open Graph Tags (For Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Book Box Cricket Grounds in Surat | Booking4U" />
                <meta property="og:description" content="Book the best box cricket turfs in Surat with Booking4U. Instant booking, easy payments, and best venues!" />
                <meta property="og:image" content="https://booking4u.in/og-image.jpg" />
                <meta property="og:url" content="https://booking4u.in" />
                
                {/* ✅ Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Book Box Cricket Grounds in Surat | Booking4U" />
                <meta name="twitter:description" content="Find and book the best box cricket turfs in Surat with Booking4U." />
                <meta name="twitter:image" content="https://booking4u.in/og-image.jpg" />

                {/* ✅ Canonical Tag */}
                <link rel="canonical" href="https://booking4u.in" />
            </Helmet>
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
