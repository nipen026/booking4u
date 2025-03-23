import theme from './theme';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import Booking from './pages/Booking';
import PaymentPage from './pages/PaymentPage';
import { Route, Routes } from 'react-router-dom';
import Register from './common/Register';
import Login from './common/Login';
import MyBookingPage from './pages/MyBookings';
import MyProfile from './pages/MyProfile';
import ContactPage from './pages/Contact';
import VenuePage from './pages/VenuePage';
import MyBox from './pages/MyBox';
import MySlots from './pages/MySlots';
import ProtectedRoute from './common/ProtecedRoute';
import AdminBookingPage from './pages/AdminBookingPage';
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/box-details/:name' element={<Booking />} />
          <Route path='/payment/:id' element={<PaymentPage />} />
          <Route path='/bookings' element={<MyBookingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/venues' element={<VenuePage />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path='/myBox' element={<MyBox />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path='/slots/:id' element={<MySlots />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path='/admin-booking' element={<AdminBookingPage />} />
          </Route>

        </Routes>

      </ThemeProvider>
    </div>
  );
}

export default App;
