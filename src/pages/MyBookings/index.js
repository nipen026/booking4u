import { useEffect, useState } from "react";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import MyBookings from "../../components/MyBooking"
import Loader from "../../common/Loader";
import { GET_CONFIRM_BOOKING } from "../../Api/get";
import { Helmet } from "react-helmet-async";

const MyBookingPage = () => {
    const [loading, setLoading] = useState(true);
    const [boxesData, setBoxesData] = useState([]);

    // Combined Effect for Loading and Data Fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GET_CONFIRM_BOOKING();
                setBoxesData(res.data.bookings); // Assuming data structure matches

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
                <title>My Bookings | Booking4u - Manage Your Cricket Turf Reservations</title>
                <meta
                    name="description"
                    content="View and manage your confirmed box cricket bookings with Booking4u. Easily check your reservations and upcoming turf slots."
                />
                <meta
                    name="keywords"
                    content="My Bookings, Cricket Turf Reservations, Manage Turf Booking, Box Cricket Confirmation"
                />

                {/* ✅ Open Graph (Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="My Bookings | Booking4u - Manage Your Cricket Turf Reservations" />
                <meta property="og:description" content="View and manage your confirmed box cricket bookings with Booking4u." />
                <meta property="og:image" content="https://Booking4u.in/my-bookings.jpg" />
                <meta property="og:url" content="https://Booking4u.in/bookings" />

                {/* ✅ Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="My Bookings | Booking4u - Manage Your Cricket Turf Reservations" />
                <meta name="twitter:description" content="View and manage your confirmed box cricket bookings with Booking4u." />
                <meta name="twitter:image" content="https://Booking4u.in/my-bookings.jpg" />

                {/* ✅ Canonical Tag */}
                <link rel="canonical" href="https://Booking4u.in/bookings" />
            </Helmet>
            <Header />
            <MyBookings boxesData={boxesData} />
            <Footer />
        </>
    )
}

export default MyBookingPage;