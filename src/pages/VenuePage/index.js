import { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Venues from "../../components/Venues";
import Loader from "../../common/Loader";
import { GET_ALL_BOX } from "../../Api/get";
import { Helmet } from "react-helmet-async";

const VenuePage = () => {
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
                <title>Best Cricket Turfs & Box Cricket Venues in Surat | Booking4u</title>
                <meta
                    name="description"
                    content="Explore and book the best cricket turfs & box cricket venues in Surat with Booking4u. Get instant booking for your favorite sports venue!"
                />
                <meta
                    name="keywords"
                    content="Cricket Turf Booking, Box Cricket Surat, Best Cricket Grounds, Indoor Cricket Venues, Book Turf Online"
                />

                {/* ✅ Open Graph (Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Best Cricket Turfs & Box Cricket Venues in Surat | Booking4u" />
                <meta property="og:description" content="Find and book the top-rated box cricket turfs in Surat for your next match!" />
                <meta property="og:image" content="https://Booking4u.in/venues.jpg" />
                <meta property="og:url" content="https://Booking4u.in/venues" />

                {/* ✅ Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Best Cricket Turfs & Box Cricket Venues in Surat | Booking4u" />
                <meta name="twitter:description" content="Find and book the top-rated box cricket turfs in Surat for your next match!" />
                <meta name="twitter:image" content="https://Booking4u.in/venues.jpg" />

                {/* ✅ Canonical Tag */}
                <link rel="canonical" href="https://Booking4u.in/venues" />
            </Helmet>
            <Header />
            <Venues boxesData={boxesData} />
            <Footer />
        </>
    )
}

export default VenuePage;