import "../styling/about.css"
import bowlingHeaderImage from "../assets/bowling.jpg"; // Add a header image

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2 className="about-title">About Big XP Bowl</h2>
        <img
          src={bowlingHeaderImage}
          className="about-image"
          alt="Bowling Alley"
        />

        <p className="about-paragraph">
          At Big XP Bowl, we're not just your ordinary bowling alley – we're
          your ultimate destination for a fantastic time! Call us at +45 12 34
          56 78 to book an unforgettable experience.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-title">State-of-the-Art Bowling Lanes</h2>
        <p className="about-paragraph">
          Get ready to strike up some serious fun on our state-of-the-art
          bowling lanes, where every roll is a chance for victory and laughter.
          Whether you're a seasoned pro or just looking to have a ball, we've
          got the perfect lane for you. We've even got lanes specially suited
          for children, so the whole family can enjoy the fun!
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-title">Exciting Games and Challenges</h2>
        <p className="about-paragraph">
          But wait, the fun doesn't end there! Take a break from bowling and
          challenge your friends to a heart-pounding game of air hockey. Feel
          the adrenaline rush as you battle it out for bragging rights and
          glory!
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-title">Delicious Food</h2>
        <p className="about-paragraph">
          And when you've worked up an appetite from all the excitement, our
          restaurant has got you covered. With our mouthwatering burgers and
          crispy fries, we've got the perfect fuel to keep you going strong.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-title">Book Your Lane Now</h2>
        <p className="about-paragraph">
          Ready to roll? Call us now at +45 12 34 56 78 to book your lane and
          lock in your spot for a day of non-stop fun! Our friendly staff is
          standing by to help you plan the ultimate Big XP experience. Don't
          wait – the good times are rolling at Big XP Bowl!
        </p>
      </div>
    </div>
  );
}
