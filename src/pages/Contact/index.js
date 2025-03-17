import { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BookingCTA from "../../components/BookingCTA";
import ContactUs from "../../components/ContactUs";
import Loader from "../../common/Loader";

const ContactPage  = () =>{
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
    return(
        <>
        <Header/>
        <ContactUs/>
        <BookingCTA />
        <Footer/>
        </>
    )
}

export default ContactPage;