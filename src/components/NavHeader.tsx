import { NavLink } from "react-router-dom";
import "../styling/navbar.css";

export default function NavHeader() {
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/reservations">Reservations</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
            <NavLink to="/products">Manage Products</NavLink>
            <NavLink to="/orderproducts">Order Products</NavLink>
            <NavLink to="/equipment">Equipment</NavLink>
            <NavLink to="/maintenance">Maintenance</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
