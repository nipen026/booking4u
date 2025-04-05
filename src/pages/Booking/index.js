import { useEffect, useState } from "react"
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import BookingCTA from "../../components/BookingCTA"
import BookingSlots from "../../components/BookingSlots"
import CricketArena from "../../components/CricketArena"
import Loader from "../../common/Loader"
import { useLocation } from "react-router-dom"
import { GET_BOX_BY_ID, GET_SLOTS } from "../../Api/get"
import { Helmet } from "react-helmet-async"

const Booking = ()  =>{
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const [boxesData, setBoxesData] = useState();
    const [slotData, setSlotData] = useState();
    const [getSelectDate, setGetSelectDate] = useState(() => {
        const today = new Date();
        return new Date(today).toISOString().split('T')[0];
    });

    const [getTurfId, setGetTurfId] = useState();

    // Fetch box data on mount
    useEffect(() => {
        const fetchBoxData = async () => {
        setLoading(true);

            try {
                const res = await GET_BOX_BY_ID(location.state);
                setBoxesData(res.data.box);

                // Set default turfId after fetching box data
                const defaultTurfId = res.data.box?.turfs?.[0]?.id;
                if (defaultTurfId) {
                    setGetTurfId(defaultTurfId);
                }
            } catch (error) {
                console.error("Error fetching boxes:", error);
            }finally{
        setLoading(false);
            }
        };

        fetchBoxData();
    }, [location.state]);

    // Fetch slot data whenever turfId or selected date changes
    useEffect(() => {
        if (getTurfId && getSelectDate) {
            fetchSlotData(getSelectDate, getTurfId);
        }
    }, [getTurfId, getSelectDate]);

    const fetchSlotData = async (date, turfId) => {
        // setLoading(true);
        try {
            const res = await GET_SLOTS(location.state, date, turfId);
            setSlotData(res.data.slot);
        } catch (error) {
            console.error("Error fetching slots:", error);
        } 
    };

    if (loading) return <Loader />;
    return  (
        <>
         <Helmet>
                <title>
                    {boxesData?.name
                        ? `${boxesData.name} - Box Cricket Turf in Surat | Booking4u`
                        : "Book Box Cricket Turf | Booking4u"}
                </title>
                <meta 
                    name="description" 
                    content={
                        boxesData?.description
                            ? boxesData.description
                            : "Find and book the best box cricket turfs in Surat with Booking4u. Get instant slot booking for a hassle-free experience!"
                    }
                />
                <meta 
                    name="keywords" 
                    content="Box Cricket Booking Surat, Turf Booking, Best Cricket Turf in Surat, Book Cricket Slot, Online Cricket Booking" 
                />

                {/* ✅ Open Graph (Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={boxesData?.name || "Book Box Cricket Turf | Booking4u"} />
                <meta property="og:description" content={boxesData?.description || "Find and book the best box cricket turfs in Surat."} />
                <meta property="og:image" content={boxesData?.image || "https://Booking4u.in/default-image.jpg"} />
                <meta property="og:url" content={`https://Booking4u.in/booking/${location.state}`} />

                {/* ✅ Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={boxesData?.name || "Book Box Cricket Turf | Booking4u"} />
                <meta name="twitter:description" content={boxesData?.description || "Find and book the best box cricket turfs in Surat."} />
                <meta name="twitter:image" content={boxesData?.image || "https://Booking4u.in/default-image.jpg"} />

                {/* ✅ Canonical Tag */}
                <link rel="canonical" href={`https://Booking4u.in/booking/${location.state}`} />
            </Helmet>
        <Header/>
        <CricketArena boxesData={boxesData}/>
        <BookingSlots setGetSelectDate={setGetSelectDate} setGetTurfId={setGetTurfId} slotData={slotData} boxesData={boxesData}/>
        <BookingCTA />
        <Footer/>
        </>
    )
}
export default Booking