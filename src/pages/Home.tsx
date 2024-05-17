import "./home.css";
import bowlingAlleyImage from "../assets/bowling.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Big XP Bowl</h1>
      <h2 className="home-subtitle">
        <i>Where the fun never stops rolling!</i>
      </h2>
      <img src={bowlingAlleyImage} alt="Bowling Alley" className="home-image" />
      <p className="home-paragraph">
        Read more about our activites <Link to="/about">here</Link> or call us
        at +45 12 34 56 78 to book an unforgettable experience.
      </p>
    </div>
  );
}
