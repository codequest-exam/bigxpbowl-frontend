import { NavLink } from "react-router-dom";

export default function NavHeader() {
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/new-reservation">New Reservation</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}