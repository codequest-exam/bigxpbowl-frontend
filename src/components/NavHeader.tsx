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
            <NavLink to="/new-reservation">New Reservation</NavLink>
            <NavLink to="/reservations">Reservations</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
