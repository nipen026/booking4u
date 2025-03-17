import { useEffect, useState } from "react";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import Payment from "../../components/Payment";
import Loader from "../../common/Loader";

const PaymentPage = () =>{
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
    return (
        <>
        <Header/>
        <Payment/>
        <Footer/>
        </>
    )
}

export default PaymentPage;