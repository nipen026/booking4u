import Banner from "../../common/Banner"
import Footer from "../../common/Footer"
import Header from "../../common/Header"
import BookingCTA from "../../components/BookingCTA"
import Profile from "../../components/Profile"

const MyProfile = ()=>{
    return (
        <>
        <Header/>
        <Banner/>
        <Profile/>
        <BookingCTA />
        <Footer/>
        </>
    )
}
export default MyProfile;