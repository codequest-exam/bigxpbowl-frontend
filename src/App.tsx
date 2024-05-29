import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
// import ReservationForm from "./components/ReservationForm";
// import ReservationList from "./components/ReservationList";
import ReservationPage from "./pages/ReservationPage";
import Calendar from "./pages/Calendar";
import Schedule from "./components/Schedule";
import OrderProducts from "./pages/OrderProducts";
import ProductPage from "./pages/ProductPage";
import EquipmentPage from "./pages/EquipmentPage";
import { ToastContainer } from "react-toastify";
import MaintenancePage from "./pages/MaintenancePage";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/orderproducts" element={<OrderProducts />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
