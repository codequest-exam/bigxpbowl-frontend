import { NavLink } from "react-router-dom";

export default function NavHeader() {
  return (
    <nav className="navbar navbar-style">
      <ul className="navbar-list">
        <div className="navbar-items">
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reservations">Reservations</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
