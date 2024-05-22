import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ReservationForm from "./pages/ReservationForm";
import Reservations from "./pages/Reservations";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new-reservation" element={<ReservationForm />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
