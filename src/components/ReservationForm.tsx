import React, { useState } from "react";
import "./reservationform.css";
import { ChosenActivity } from "../interfaces/reservationInterface";
import { Reservation } from "../interfaces/reservationInterface";

interface ReservationFormData {
  name: string;
  phoneNumber: string;
  numParticipants: number;
  activity: string;
  date: string;
  startTime: string;
  duration: string;
  chosenActivities: ChosenActivity[];
}



export default function ReservationForm({ existingReservation }: { existingReservation?: Reservation }) {
  const [formData, setFormData] = useState<ReservationFormData>(
    existingReservation
      ? {
          name: existingReservation.name,
          phoneNumber: existingReservation.phoneNumber,
          numParticipants: existingReservation.participants,
          activity: "",
          date: existingReservation.activities[0].date.toISOString().split("T")[0],
          startTime: "",
          duration: "",
          chosenActivities: existingReservation.activities,
        }
      : {
          name: "",
          phoneNumber: "",
          numParticipants: 0,
          activity: "",
          date: "",
          startTime: "",
          duration: "",
          chosenActivities: [],
        }
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      participants: +formData.numParticipants,
      activities: formData.chosenActivities.map(activity => ({ ...activity, activity: activity.activity.toUpperCase })),
      //activities: formData.chosenActivities.forEach(element => element.activity.toUpperCase()),
    };

    console.log(formData);

    console.log(newReservation);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    const checks: { [key: string]: boolean } = {
      activity: formData.activity !== "",
      startTime: formData.startTime !== "",
      duration: formData.duration !== "",
      date: formData.date !== "",
    };

    if (formData.chosenActivities.filter(activity => activity.activity === formData.activity).length !== 0) {
      setErrorMessage("Activity already added");
    }
    else if (checks.activity && checks.startTime && checks.duration && checks.date
    ) {
      console.log(formData.startTime);

      const stringToDate = new Date(formData.date);
      const time = formData.startTime.split(":");
      const startTime = new Date(stringToDate.setHours(parseInt(time[0])));
      const endTime = new Date(stringToDate.setHours(stringToDate.getHours() + parseInt(formData.duration)));
      stringToDate.setHours(parseInt(formData.startTime.split(":")[0]));
      stringToDate.setMinutes(parseInt(formData.startTime.split(":")[1]));
      console.log(stringToDate);

      setFormData(prevFormData => ({
        ...prevFormData,
        chosenActivities: [
          ...prevFormData.chosenActivities,
          {
            activity: formData.activity,
            startTime: startTime,
            endTime: endTime,
            date: stringToDate,
          },
        ],
        // activity: "",
        // startTime: "",
        // duration: "",
      }));
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Please fill out " +
          Object.keys(checks)
            .filter(key => !checks[key])
            .join(" & ")
      );
    }
  };

  const handleRemoveActivity = (chosenActivity: ChosenActivity) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      chosenActivities: prevFormData.chosenActivities.filter(activity => activity.activity !== chosenActivity.activity),
    }));
  };

  return (
    <div className="reservation-form-page">
      <h2 className="reservation-header">Add New Reservation</h2>
      <div className="reservation-form-container">
        <form className="reservation-form" onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
          </label>
          <label>
            Number of Participants:
            <input type="number" name="numParticipants" value={formData.numParticipants} onChange={handleInputChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </label>
          <label>
            Activity:
            <select name="activity" value={formData.activity} onChange={handleInputChange}>
              <option value="">Select an activity</option>
              <option value="Bowling">Bowling</option>
              <option value="Airhockey">Air Hockey</option>
              <option value="Dining">Dining</option>
            </select>
            <button type="button" onClick={handleAddActivity}>
              Add
            </button>
          </label>

          <label>
            Start Time:
            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
          </label>
          <label>
            Duration:
            <select name="duration" value={formData.duration} onChange={handleInputChange}>
              <option value="">Select duration</option>
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <div className="chosen-activities">
          <h3>Chosen Activities:</h3>
          <h4 className="error-message">{errorMessage && <p>{errorMessage}</p>}</h4>

          <ul>
            {formData.chosenActivities.map(chosenActivity => (
              <div key={chosenActivity.activity}>
                <li>Activity: {chosenActivity.activity}</li>
                {/* <li>Start time: {chosenActivity.startTime.getHours()}</li>
                <li>End time: {chosenActivity.endTime.getHours()}</li> */}

                <button type="button" onClick={() => handleRemoveActivity(chosenActivity)}>
                  Remove
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
