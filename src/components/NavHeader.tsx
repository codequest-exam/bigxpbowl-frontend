import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styling/navbar.css";
import { RoleContext } from "../services/RoleContext.tsx";

export default function NavHeader() {
  const { role } = useContext(RoleContext);
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About us</NavLink>
            {role == "admin" && <NavLink to="/new-reservation">New Reservation</NavLink>}

            <NavLink to="/reservations">Reservations</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/schedule">Schedule</NavLink>
            <NavLink to="/products">Manage Products</NavLink>
            <NavLink to="/orderproducts">Order Products</NavLink>
            <NavLink to="/equipment">Equipment</NavLink>
            <NavLink to="/maintenance">Maintenance</NavLink>
            <NavLink to="/login">Login</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
