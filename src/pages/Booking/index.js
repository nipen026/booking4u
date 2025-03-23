import { useEffect, useState } from "react"
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import BookingCTA from "../../components/BookingCTA"
import BookingSlots from "../../components/BookingSlots"
import CricketArena from "../../components/CricketArena"
import Loader from "../../common/Loader"
import { useLocation } from "react-router-dom"
import { GET_BOX_BY_ID, GET_SLOTS } from "../../Api/get"

const Booking = ()  =>{
      const [loading, setLoading] = useState(true);
    const location = useLocation()
    const [boxesData, setBoxesData] = useState();
    const [slotData,setSlotData] = useState();
    const [getSelectDate,setGetSelectDate] = useState()
    const dateStr = new Date();
    const formattedDate = new Date(dateStr).toISOString().split('T')[0];
    // Combined Effect for Loading and Data Fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GET_BOX_BY_ID(location.state);
                
                setBoxesData(res.data.box); // Assuming data structure matches
            } catch (error) {
                console.error('Error fetching boxes:', error);
            } finally {
                setLoading(false);
            }
        };
      

        fetchData();
        fetchSlotData(formattedDate);
    }, []);
useEffect(()=>{
    fetchSlotData(getSelectDate)
},[getSelectDate])
const fetchSlotData = async (date) => {
    
    try {
        const res = await GET_SLOTS(location.state,date);
        setSlotData(res.data.slot)
    } catch (error) {
        console.error('Error fetching boxes:', error);
    } finally {
        setLoading(false);
    }
};

    if (loading) return <Loader />;
    return  (
        <>
        <Header/>
        <CricketArena boxesData={boxesData}/>
        <BookingSlots setGetSelectDate={setGetSelectDate} slotData={slotData} boxesData={boxesData}/>
        <BookingCTA />
        <Footer/>
        </>
    )
}
export default Booking