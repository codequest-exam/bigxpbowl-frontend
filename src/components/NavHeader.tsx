import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styling/navbar.css";
import { RoleContext } from "../services/RoleContext.tsx";

export default function NavHeader() {
  const { role } = useContext(RoleContext);
  // const role = localStorage.getItem("role");
  console.log(role);
  console.log(role == "admin");

  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About us</NavLink>
            {role === "admin" && <NavLink to="/new-reservation">New Reservation</NavLink>}
            {role === "admin" && <NavLink to="/reservations">Reservations</NavLink>}
            {role === "admin" && <NavLink to="/calendar">Calendar</NavLink>}
            {role === "admin" && <NavLink to="/schedule">Schedule</NavLink>}
            {role === "admin" && <NavLink to="/products">Manage Products</NavLink>}
            {role === "admin" && <NavLink to="/orderproducts">Order Products</NavLink>}
            {(role === "admin" || role === "operator") && <NavLink to="/equipment">Equipment</NavLink>}
            {(role === "admin" || role === "operator") && <NavLink to="/maintenance">Maintenance</NavLink>}
            <NavLink to="/login">Login</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
