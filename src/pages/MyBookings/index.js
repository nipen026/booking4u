import { useEffect, useState } from "react";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import MyBookings from "../../components/MyBooking"
import Loader from "../../common/Loader";
import { GET_CONFIRM_BOOKING } from "../../Api/get";

const MyBookingPage = () =>{
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
        
    return(
        <>
        <Header/>
        <MyBookings boxesData={boxesData}/>
        <Footer/>
        </>
    )
}

export default MyBookingPage;