import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import Header from "../../common/Header";
import Banner from "../../common/Banner";
import AdminAllBookings from "../../components/AdminBookings";
import Footer from "../../common/Footer";
import { GET_ALL_ADMIN_BOOKING } from "../../Api/get";

const AdminBookingPage = () =>{
    const [loading, setLoading] = useState(true);
        const [bookingsData, setBookingsData] = useState([]);
    
        // Combined Effect for Loading and Data Fetching
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await GET_ALL_ADMIN_BOOKING();                    
                    setBookingsData(res.bookings); // Assuming data structure matches
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
        <Header/>
        <Banner/>
        <AdminAllBookings bookingsData={bookingsData}/>
        <Footer/>
        </>
    )
}

export default AdminBookingPage;