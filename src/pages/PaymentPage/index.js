import { useEffect, useState } from "react";
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import Payment from "../../components/Payment";
import Loader from "../../common/Loader";
import { GET_BOOKING_BY_ID } from "../../Api/get";
import { useLocation } from "react-router-dom";

const PaymentPage = () =>{
          const [loading, setLoading] = useState(true);
          const [boxData, setBoxData] = useState([]);
        const location  = useLocation();
        const id = location.pathname.split('/')[2]  
        // Combined Effect for Loading and Data Fetching
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const res = await GET_BOOKING_BY_ID(id);
                        setBoxData(res.data)
                        
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
        <Payment boxData={boxData}/>
        <Footer/>
        </>
    )
}

export default PaymentPage;