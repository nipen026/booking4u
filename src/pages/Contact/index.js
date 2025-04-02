import { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BookingCTA from "../../components/BookingCTA";
import ContactUs from "../../components/ContactUs";
import Loader from "../../common/Loader";
import { Helmet } from "react-helmet-async";

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
        <Helmet>
                <title>Contact Us | Booking4u - Get in Touch</title>
                <meta 
                    name="description" 
                    content="Have questions or need help with your box cricket booking? Contact us at Booking4u. We are here to assist you with your turf bookings in Surat!" 
                />
                <meta 
                    name="keywords" 
                    content="Contact Booking4u, Cricket Turf Support, Box Cricket Booking Help, Surat Turf Inquiry" 
                />

                {/* ✅ Open Graph (Social Media) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contact Us | Booking4u - Get in Touch" />
                <meta property="og:description" content="Have questions or need help with your box cricket booking? Contact us now!" />
                <meta property="og:image" content="https://Booking4u.in/contact-us.jpg" />
                <meta property="og:url" content="https://Booking4u.in/contact" />

                {/* ✅ Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | Booking4u - Get in Touch" />
                <meta name="twitter:description" content="Have questions or need help with your box cricket booking? Contact us now!" />
                <meta name="twitter:image" content="https://Booking4u.in/contact-us.jpg" />

                {/* ✅ Canonical Tag */}
                <link rel="canonical" href="https://Booking4u.in/contact" />
            </Helmet>
        <Header/>
        <ContactUs/>
        <BookingCTA />
        <Footer/>
        </>
    )
}

export default ContactPage;