import React, { useState } from "react";
import "./reservationform.css";

interface ReservationFormData {
  name: string;
  phoneNumber: string;
  numParticipants: number;
  activity: string;
  date: string;
  startTime: string;
  duration: string;
  chosenActivities: string[];
}

const Reservations: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    phoneNumber: "",
    numParticipants: 0,
    activity: "",
    date: "",
    startTime: "",
    duration: "",
    chosenActivities: [],
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    if (formData.activity) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        chosenActivities: [
          ...prevFormData.chosenActivities,
          prevFormData.activity,
        ],
        activity: "",
      }));
    }
  };

  const handleRemoveActivity = (chosenActivity: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      chosenActivities: prevFormData.chosenActivities.filter(
        (activity) => activity !== chosenActivity
      ),
    }));
  };

  return (
    <div className="reservation-form-page">
      <h2 className="reservation-header">Add New Reservation</h2>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Number of Participants:
            <input
              type="number"
              name="numParticipants"
              value={formData.numParticipants}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Activity:
            <select
              name="activity"
              value={formData.activity}
              onChange={handleInputChange}
            >
              <option value="">Select an activity</option>
              <option value="bowling">Bowling</option>
              <option value="airhockey">Air Hockey</option>
              <option value="dining">Dining</option>
            </select>
            <button type="button" onClick={handleAddActivity}>
              Add
            </button>
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Duration:
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            >
              <option value="">Select duration</option>
              <option value="1hr">1 hour</option>
              <option value="2hr">2 hours</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          <ul>
            {formData.chosenActivities.map((chosenActivity) => (
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
        </div>
      </div>
    </div>
  );
};

export default Reservations;
