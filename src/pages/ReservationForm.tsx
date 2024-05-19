import React, { useState } from "react";

const ReservationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numParticipants, setNumParticipants] = useState(0);
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [chosenActivities, setChosenActivities] = useState<string[]>([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleAddActivity = () => {
    if (activity) {
      setChosenActivities([...chosenActivities, activity]);
      setActivity("");
    }
  };

  const handleRemoveActivity = (chosenActivity: string) => {
    const updatedActivities = chosenActivities.filter(
      (activity) => activity !== chosenActivity
    );
    setChosenActivities(updatedActivities);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Number of Participants:
        <input
          type="number"
          value={numParticipants}
          onChange={(e) => setNumParticipants(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Activity:
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">Select an activity</option>
          <option value="bowling">Bowling</option>
          <option value="airhockey">Air Hockey</option>
          <option value="dining">Dining</option>
        </select>
        <button type="button" onClick={handleAddActivity}>
          Add
        </button>
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Start Time:
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Duration:
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">Select duration</option>
          <option value="1hr">1 hour</option>
          <option value="2hr">2 hours</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
      <br />
      <h3>Chosen Activities:</h3>
      <ul>
        {chosenActivities.map((chosenActivity) => (
          <li key={chosenActivity}>
            {chosenActivity}
            <button
              type="button"
              onClick={() => handleRemoveActivity(chosenActivity)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default ReservationForm;
