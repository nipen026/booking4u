import { useEffect, useState } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import Venues from "../../components/Venues";
import Loader from "../../common/Loader";
import { GET_ALL_BOX } from "../../Api/get";

const VenuePage = () =>{
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
    return(
        <>
        <Header/>
        <Venues boxesData={boxesData}/>
        <Footer/>
        </>
    )
}

export default VenuePage;