import { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Venues from "../../components/Venues";
import Loader from "../../common/Loader";

const VenuePage = () =>{
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
        <Venues/>
        <Footer/>
        </>
    )
}

export default VenuePage;